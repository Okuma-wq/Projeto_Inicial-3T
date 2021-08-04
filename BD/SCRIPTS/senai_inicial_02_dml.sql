-- DML

USE INICIAL_3DT;
GO


INSERT INTO TiposUsuarios(permissao)
VALUES	('Administrador'),
		('Professor');
GO

INSERT INTO Usuarios(idTipoUsuario, email, senha)
VALUES	(1, 'adm@adm.com', 'adm123'),
		(2, 'paulo@gmail.com', 'paulo123'),
		(2, 'pri@gmail.com', 'pri123');
GO

INSERT INTO Salas(nomeSala, andar, metragem)
VALUES	('Inform�tica', 0, 10),
		('M�sica', 0, 12),
		('Matem�tica', 1, 8),
		('F�sica', 1, 8),
		('Biologia', 2, 8),
		('Qu�mica', 2, 10);
GO

INSERT INTO TiposEquipamentos(titulo)
VALUES	('Cadeira'),
		('Mesa'),
		('Computador'),
		('Notebook'),
		('Projetor'),
		('Mapa'),
		('Tubo de Ensaio'),
		('Viol�o'),
		('Microfone'),
		('Televis�o'),
		('Mouse');
GO

INSERT INTO Equipamentos(