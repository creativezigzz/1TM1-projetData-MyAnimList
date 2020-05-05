CREATE FUNCTION createToken()
/* Génère un nouveau token unique à l'aide des fonctions rand() et hash() */
RETURNS char(32)
BEGIN
	DECLARE @token char(32);
	SET @token = hash(rand(), 'md5');

	/* On s'assure que le token est unique */
	IF (SELECT 1 FROM personne WHERE token = @token) = 1 THEN
		/* Sinon on le re génère */
		SET @token = createToken();
	ENDIF;

	RETURN @token;
END;

CREATE PROCEDURE "DBA"."login"( IN username char(30), IN password char(64) )
RESULT( nom char(30), prenom char(30), token char(32) )
BEGIN
	/* Le mot de passe est-il correct ? */
	IF (SELECT 1 FROM personne WHERE pseudo = username AND mdp = password) = 1 THEN
		/* Oui, on crée un nouveau token (max 1 session) */
		UPDATE personne
		SET token = createToken()
		WHERE pseudo = username;

		/* Et on retourne les infos */
		SELECT nomP, prenomP, token FROM personne WHERE pseudo = username;
	ELSE
		SELECT null, null, null; /* Non, on retourne NULL */
	ENDIF;
END;

CREATE SERVICE "login"
	TYPE 'JSON'
	AUTHORIZATION OFF
	USER "DBA"
	URL ON
	METHODS 'POST,GET'
AS call "DBA"."login"(:username, :mdp);

CREATE PROCEDURE "DBA"."add_user"( IN username char(30), IN nom char(30), IN prenom char(30), IN @mdp char(64) )
/* Ajoute un nouvel utilisateur dans la base de donnée */
RESULT( success BOOLEAN, "message" char(60), token char(32)  )
BEGIN
	DECLARE @token char(32);

	/* On vérifie que le pseudo est unique. */
	IF (SELECT 1 FROM personne WHERE pseudo = username) = 1 THEN
		SELECT 0, 'Ce pseudo n''est pas disponible.', NULL;
		RETURN;
	ENDIF;

	/* On crée un nouvel token */
	SET @token = createToken();

	/* On ajoute la personne à la table personne */
	INSERT INTO personne VALUES (
		username,
		nom,
		prenom,
		@mdp,
		@token
	);

	/* Tout s'est bien déroulé, on retourne le token */
	SELECT 1, NULL, @token;
END;

CREATE SERVICE "add_user"
	TYPE 'JSON'
	AUTHORIZATION OFF
	USER "DBA"
	URL ON
	METHODS 'POST,GET'
AS call "DBA"."add_user"(:pseudo, :nom, :prenom, :mdp);
