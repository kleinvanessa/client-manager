-- Insert Data Script

-- 5 Inserts
INSERT INTO Clients (Name, Email, Phone, RegistrationDate, IsBlocked, ClientType, CpfCnpj, StateRegistration, IsStateRegistrationExempt, Gender, BirthDate, Password)
VALUES
('João Silva', 'joao.silva1@example.com', '11912345678', '2022-01-15', 0, 1, '12345678901', '123456789012', 0, 1, '1990-02-10', 'password123'),
('Maria Souza', 'maria.souza2@example.com', '21912345679', '2022-02-20', 0, 1, '12345678902', NULL, 1, 2, '1985-06-15', '1234pass'),
('Empresa XYZ Ltda', 'contato@xyz3.com', '31912345670', '2022-03-25', 0, 2, '12345678000191', '123456789013', 0, NULL, NULL, 'empresa12345'),
('Pedro Santos', 'pedro.santos4@example.com', '41912345671', '2022-04-30', 1, 1, '12345678903', '123456789014', 0, 1, '1978-11-23', 'mypass123'),
('Ana Pereira', 'ana.pereira5@example.com', '51912345672', '2022-05-05', 0, 1, '12345678904', '123456789015', 0, 3, '2000-07-30', 'mysecurepass');

-- 15 Inserts
INSERT INTO Clients (Name, Email, Phone, RegistrationDate, IsBlocked, ClientType, CpfCnpj, StateRegistration, IsStateRegistrationExempt, Gender, BirthDate, Password)
VALUES
('Clara Mendes', 'clara.mendes6@example.com', '61912345673', '2022-06-10', 0, 1, '12345678905', NULL, 1, 2, '1995-03-14', 'pass5678'),
('Lucas Araujo', 'lucas.araujo7@example.com', '71912345674', '2022-07-20', 1, 1, '12345678906', '123456789016', 0, 1, '1988-01-12', 'securepass'),
('Empresa ABC SA', 'contato@abc8.com', '81912345675', '2022-08-15', 0, 2, '12345678000292', '123456789017', 0, NULL, NULL, 'empresaABC123'),
('Roberto Lima', 'roberto.lima9@example.com', '91912345676', '2022-09-25', 0, 1, '12345678907', '123456789018', 0, 1, '1982-12-10', 'mypassword'),
('Fernanda Rocha', 'fernanda.rocha10@example.com', '11912345677', '2022-10-30', 1, 1, '12345678908', '123456789019', 0, 2, '1993-05-20', 'passcode123'),
('Gabriel Martins', 'gabriel.martins11@example.com', '12912345678', '2022-11-15', 0, 1, '12345678909', '123456789020', 0, 1, '1999-02-28', 'gmartins2022'),
('Julia Fernandes', 'julia.fernandes12@example.com', '13912345679', '2022-12-25', 0, 1, '12345678910', NULL, 1, 3, '1991-09-05', 'fernandesjul'),
('Empresa DEF Ltda', 'contato@def13.com', '14912345670', '2023-01-05', 0, 2, '12345678000313', '123456789021', 0, NULL, NULL, 'defcompany123'),
('Marcos Dias', 'marcos.dias14@example.com', '15912345671', '2023-02-18', 1, 1, '12345678911', '123456789022', 0, 1, '1984-08-16', 'marcosD123'),
('Sofia Costa', 'sofia.costa15@example.com', '16912345672', '2023-03-27', 0, 1, '12345678912', '123456789023', 0, 2, '1987-10-03', 'sofiaC2023'),
('Empresa GHI SA', 'contato@ghi16.com', '17912345673', '2023-04-15', 0, 2, '12345678000434', '123456789024', 0, NULL, NULL, 'ghiGHI2023'),
('Tiago Alves', 'tiago.alves17@example.com', '18912345674', '2023-05-22', 0, 1, '12345678913', '123456789025', 0, 1, '1981-06-11', 'tiagoA2023'),
('Beatriz Melo', 'beatriz.melo18@example.com', '19912345675', '2023-06-30', 1, 1, '12345678914', '123456789026', 0, 2, '2001-04-22', 'beatrizM123'),
('Daniel Souza', 'daniel.souza19@example.com', '20912345676', '2023-07-05', 0, 1, '12345678915', '123456789027', 0, 1, '1975-07-19', 'danSouza75'),
('Carla Lima', 'carla.lima20@example.com', '21912345677', '2023-08-08', 0, 1, '12345678916', NULL, 1, 2, '1994-11-30', 'carlaLima2023');

-- 20 Inserts
INSERT INTO Clients (Name, Email, Phone, RegistrationDate, IsBlocked, ClientType, CpfCnpj, StateRegistration, IsStateRegistrationExempt, Gender, BirthDate, Password)
VALUES
('Ricardo Lopes', 'ricardo.lopes21@example.com', '22912345678', '2023-09-12', 0, 1, '12345678917', '123456789028', 0, 1, '1973-03-18', 'ricardo123'),
('Mariana Almeida', 'mariana.almeida22@example.com', '23912345679', '2023-10-21', 1, 1, '12345678918', '123456789029', 0, 2, '1980-12-25', 'mariana1980'),
('Empresa JKL Ltda', 'contato@jkl23.com', '24912345670', '2023-11-04', 0, 2, '12345678000545', '123456789030', 0, NULL, NULL, 'jklCompany'),
('Thiago Moreira', 'thiago.moreira24@example.com', '25912345671', '2023-12-17', 0, 1, '12345678919', '123456789031', 0, 1, '1998-06-07', 'thiagoM123'),
('Patricia Cardoso', 'patricia.cardoso25@example.com', '26912345672', '2024-01-02', 0, 1, '12345678920', '123456789032', 0, 2, '1992-05-12', 'patricia2024'),
('Felipe Nogueira', 'felipe.nogueira26@example.com', '27912345673', '2024-02-15', 1, 1, '12345678921', '123456789033', 0, 1, '1989-04-05', 'felipeN2024'),
('Bruna Oliveira', 'bruna.oliveira27@example.com', '28912345674', '2024-03-30', 0, 1, '12345678922', NULL, 1, 2, '1996-11-18', 'brunaOli'),
('Empresa MNO SA', 'contato@mno28.com', '29912345675', '2024-04-25', 0, 2, '12345678000656', '123456789034', 0, NULL, NULL, 'mnoMNO028'),
('Rodrigo Teixeira', 'rodrigo.teixeira29@example.com', '30912345676', '2024-05-10', 1, 1, '12345678923', '123456789035', 0, 1, '1977-08-14', 'rodrigoT'),
('Juliana Castro', 'juliana.castro30@example.com', '31912345677', '2024-06-18', 0, 1, '12345678924', '123456789036', 0, 2, '1990-03-21', 'julianaC'),
('Diego Freitas', 'diego.freitas31@example.com', '32912345678', '2024-07-27', 0, 1, '12345678925', '123456789037', 0, 1, '1997-09-02', 'diegoF123'),
('Renata Borges', 'renata.borges32@example.com', '33912345679', '2024-08-15', 1, 1, '12345678926', '123456789038', 0, 2, '1985-12-07', 'renataB32'),
('Empresa PQR Ltda', 'contato@pqr33.com', '34912345670', '2024-09-30', 0, 2, '12345678000767', '123456789039', 0, NULL, NULL, 'pqrPQR2024'),
('Vinicius Lima', 'vinicius.lima34@example.com', '35912345671', '2024-10-10', 0, 1, '12345678927', '123456789040', 0, 1, '1992-07-19', 'viniciusL'),
('Aline Silva', 'aline.silva35@example.com', '36912345672', '2024-11-25', 0, 1, '12345678928', NULL, 1, 2, '1988-01-13', 'alineSilva'),
('João Pedro', 'joao.pedro36@example.com', '37912345673', '2024-12-05', 0, 1, '12345678929', '123456789041', 0, 1, '1999-02-15', 'joaopedro'),
('Camila Santos', 'camila.santos37@example.com', '38912345674', '2025-01-20', 1, 1, '12345678930', '123456789042', 0, 2, '1983-11-26', 'camila123'),
('Empresa STU SA', 'contato@stu38.com', '39912345675', '2025-02-15', 0, 2, '12345678000878', '123456789043', 0, NULL, NULL, 'stuSTU2025'),
('Henrique Souza', 'henrique.souza39@example.com', '40912345676', '2025-03-05', 0, 1, '12345678931', '123456789044', 0, 1, '1982-04-18', 'henrique123'),
('Larissa Medeiros', 'larissa.medeiros40@example.com', '41912345677', '2025-04-10', 1, 1, '12345678932', '123456789045', 0, 2, '1997-06-30', 'larissaM');

-- 40 Inserts
INSERT INTO Clients (Name, Email, Phone, RegistrationDate, IsBlocked, ClientType, CpfCnpj, StateRegistration, IsStateRegistrationExempt, Gender, BirthDate, Password)
VALUES
('Eduardo Costa', 'eduardo.costa41@example.com', '42912345678', '2025-05-01', 0, 1, '12345678933', '123456789046', 0, 1, '1980-02-19', 'eduardo123'),
('Marcela Cardoso', 'marcela.cardoso42@example.com', '43912345679', '2025-06-12', 1, 1, '12345678934', '123456789047', 0, 2, '1995-08-30', 'marcela123'),
('Empresa VWX Ltda', 'contato@vwx43.com', '44912345670', '2025-07-25', 0, 2, '12345678000989', '123456789048', 0, NULL, NULL, '43vwx2025'),
('Andreia Nascimento', 'andreia.nascimento44@example.com', '45912345671', '2025-08-18', 0, 1, '12345678935', '123456789049', 0, 2, '1987-04-11', 'andreia123'),
('Luis Felipe', 'luis.felipe45@example.com', '46912345672', '2025-09-10', 0, 1, '12345678936', '123456789050', 0, 1, '1998-12-24', 'luisFelipe'),
('Monica Rocha', 'monica.rocha46@example.com', '47912345673', '2025-10-05', 1, 1, '12345678937', NULL, 1, 3, '1996-03-29', 'monicaRocha'),
('Empresa YZ Ltda', 'contato@yz47.com', '48912345674', '2025-11-15', 0, 2, '12345678001091', '123456789051', 0, NULL, NULL, 'yzcompany'),
('Antonio Medeiros', 'antonio.medeiros48@example.com', '49912345675', '2025-12-20', 0, 1, '12345678938', '123456789052', 0, 1, '1990-09-13', 'antonio2025'),
('Carolina Marques', 'carolina.marques49@example.com', '50912345676', '2026-01-25', 1, 1, '12345678939', '123456789053', 0, 2, '1992-11-05', 'carolinaM'),
('Vitor Oliveira', 'vitor.oliveira50@example.com', '51912345677', '2026-02-15', 0, 1, '12345678940', '123456789054', 0, 1, '1986-10-07', 'vitorOli'),
('Paula Fernandes', 'paula.fernandes51@example.com', '52912345678', '2026-03-10', 0, 1, '12345678941', '123456789055', 0, 2, '1983-01-12', 'paulaF2026'),
('Empresa ZYX SA', 'contato@zyx52.com', '53912345679', '2026-04-20', 0, 2, '12345678001112', '123456789056', 0, NULL, NULL, 'zyxcompany'),
('Roberta Lima', 'roberta.lima53@example.com', '54912345670', '2026-05-27', 1, 1, '12345678942', '123456789057', 0, 2, '1994-02-11', 'robertaLima'),
('Carlos Henrique', 'carlos.henrique54@example.com', '55912345671', '2026-06-15', 0, 1, '12345678943', '123456789058', 0, 1, '1985-06-18', '54carlosH'),
('Mariana Silva', 'mariana.silva55@example.com', '56912345672', '2026-07-09', 0, 1, '12345678944', '123456789059', 0, 2, '1988-05-22', 'marianaS'),
('Empresa TUV Ltda', 'contato@tuv56.com', '57912345673', '2026-08-04', 0, 2, '12345678001223', '123456789060', 0, NULL, NULL, 'tuvcompany'),
('Rafael Almeida', 'rafael.almeida57@example.com', '58912345674', '2026-09-18', 1, 1, '12345678945', '123456789061', 0, 1, '1993-03-14', 'rafaelA57'),
('Amanda Costa', 'amanda.costa58@example.com', '59912345675', '2026-10-25', 0, 1, '12345678946', '123456789062', 0, 2, '1997-07-03', 'amandaC58'),
('Matheus Vieira', 'matheus.vieira59@example.com', '60912345676', '2026-11-02', 0, 1, '12345678947', '123456789063', 0, 1, '1980-09-25', 'matheusV'),
('Fernanda Alves', 'fernanda.alves60@example.com', '61912345677', '2026-12-08', 1, 1, '12345678948', NULL, 1, 2, '1991-12-15', 'fernandaA'),
('Bruno Gonçalves', 'bruno.goncalves61@example.com', '62912345678', '2027-01-19', 0, 1, '12345678949', '123456789064', 0, 1, '1984-11-20', 'brunoG61'),
('Clara Souza', 'clara.souza62@example.com', '63912345679', '2027-02-17', 0, 1, '12345678950', '123456789065', 0, 2, '1995-01-29', 'claraS62'),
('Empresa OPQ SA', 'contato@opq63.com', '64912345670', '2027-03-05', 0, 2, '12345678001334', '123456789066', 0, NULL, NULL, 'opqcompany'),
('Marcos Vinicius', 'marcos.vinicius64@example.com', '65912345671', '2027-04-23', 0, 1, '12345678951', '123456789067', 0, 1, '1982-06-13', 'marcosV64'),
('Ana Luiza', 'ana.luiza65@example.com', '66912345672', '2027-05-20', 1, 1, '12345678952', '123456789068', 0, 2, '1994-02-18', 'anaLuiza'),
('Empresa RST Ltda', 'contato@rst66.com', '67912345673', '2027-06-11', 0, 2, '12345678001445', '123456789069', 0, NULL, NULL, 'rstcompany'),
('Felipe Martins', 'felipe.martins67@example.com', '68912345674', '2027-07-09', 0, 1, '12345678953', '123456789070', 0, 1, '1986-05-25', 'felipeM67'),
('Juliana Fernandes', 'juliana.fernandes68@example.com', '69912345675', '2027-08-19', 0, 1, '12345678954', '123456789071', 0, 2, '1999-04-04', 'julianaF'),
('Lucas Nascimento', 'lucas.nascimento69@example.com', '70912345676', '2027-09-02', 0, 1, '12345678955', '123456789072', 0, 1, '1992-09-30', 'lucasN69'),
('Gabriela Santos', 'gabriela.santos70@example.com', '71912345677', '2027-10-15', 1, 1, '12345678956', '123456789073', 0, 2, '1983-11-16', 'gabrielaS'),
('Renan Oliveira', 'renan.oliveira71@example.com', '72912345678', '2027-11-03', 0, 1, '12345678957', '123456789074', 0, 1, '1998-01-13', 'renanOliveira'),
('Beatriz Costa', 'beatriz.costa72@example.com', '73912345679', '2027-12-20', 0, 1, '12345678958', '123456789075', 0, 2, '1996-05-29', 'beatrizC'),
('Empresa UVW Ltda', 'contato@uvw73.com', '74912345670', '2028-01-14', 0, 2, '12345678001556', '123456789076', 0, NULL, NULL, 'uvwcompany'),
('Gustavo Pereira', 'gustavo.pereira74@example.com', '75912345671', '2028-02-25', 0, 1, '12345678959', '123456789077', 0, 1, '1993-07-14', 'gustavoP'),
('Isabella Souza', 'isabella.souza75@example.com', '76912345672', '2028-03-08', 1, 1, '12345678960', '123456789078', 0, 2, '1988-10-11', 'isabellaS'),
('Eduardo Oliveira', 'eduardo.oliveira76@example.com', '77912345673', '2028-04-19', 0, 1, '12345678961', '123456789079', 0, 1, '1982-08-20', 'eduardoO'),
('Sophia Mendes', 'sophia.mendes77@example.com', '78912345674', '2028-05-03', 0, 1, '12345678962', '123456789080', 0, 2, '1994-12-01', 'sophiaM94'),
('Empresa XYZ SA', 'contato@xyz78.com', '79912345675', '2028-06-16', 0, 2, '12345678001667', '123456789081', 0, NULL, NULL, 'xyzcompany'),
('Daniel Ribeiro', 'daniel.ribeiro79@example.com', '80912345676', '2028-07-25', 1, 1, '12345678963', '123456789082', 0, 1, '1990-03-10', 'danielR79'),
('Luana Almeida', 'luana.almeida80@example.com', '81912345677', '2028-08-09', 0, 1, '12345678964', '123456789083', 0, 2, '1995-07-06', 'luanaA80');


