insert into genre
	(genrNom)
values
	('Action'),
	('Aventure'),
	('Comédie'),
	('Drama'),
	('Slice of Life'),
	('Fantaisie'),
	('Horreur'),
	('Mystères'),
	('Psychologique'),
	('Romance'),
	('Science-Fiction'),
	('Arts martiaux'),
	('Furyo');

insert into personne
	(pseudo, nomP,prenomP, mdp, token)
values
	('igzz', 'Silva', 'Lucas', 'kikou', hash(rand(), 'md5')),
	('math', 'Walravens', 'Mathieu', 'koko', hash(rand(), 'md5')),
	('qServais', 'Servais', 'Quentin', 'kiki', hash(rand(), 'md5')),
	('slime789', 'Grandjean', 'Cyril', 'kuku', hash(rand(),'md5'));

insert into anime
	(titre, genrId)
values
	('Full Metal Alchimist: Brotherhood', 2),
	('Cowboy Bebop', 11),
	('Code Geass', 9),
	('Neon Genenis Evangelion', 11),
	('Dragon Ball Z', 1),
	('Naruto Shippuden', 2),
	('Samurai Champloo', 12),
	('Détective Conan', 8),
	('One Piece', 2),
	('Hunter x Hunter', 2),
	('Attack on Titan', 1),
	('Jojos Bizarre Adventure', 2),
	('Sword Art Online', 6);

insert into myList
	(pseudo, animeId, rating)
values
	('igzz', 2, 5),
	('igzz', 4, 5),
	('qServais', 2, 4),
	('qServais', 10, 5),
	('slime789', 10, 4),
	('slime789', 1, 4),
	('slime789', 5, 1),
	('slime789', 6, 2),
	('slime789', 8, 3),
	('math', 8, 5),
	('math', 6, 5),
	('math', 2, 5),
	('math', 1, 5);
