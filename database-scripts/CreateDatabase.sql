IF OBJECT_ID(N'[__EFMigrationsHistory]') IS NULL
BEGIN
    CREATE TABLE [__EFMigrationsHistory] (
        [MigrationId] nvarchar(150) NOT NULL,
        [ProductVersion] nvarchar(32) NOT NULL,
        CONSTRAINT [PK___EFMigrationsHistory] PRIMARY KEY ([MigrationId])
    );
END;
GO

BEGIN TRANSACTION;
GO

CREATE TABLE [Clients] (
    [Id] int NOT NULL IDENTITY,
    [Name] nvarchar(150) NOT NULL,
    [Email] nvarchar(150) NOT NULL,
    [Phone] nvarchar(11) NOT NULL,
    [RegistrationDate] datetime2 NOT NULL DEFAULT (GETDATE()),
    [IsBlocked] bit NOT NULL DEFAULT CAST(0 AS bit),
    [ClientType] int NOT NULL,
    [CpfCnpj] nvarchar(14) NOT NULL,
    [StateRegistration] nvarchar(12) NULL,
    [IsStateRegistrationExempt] bit NOT NULL DEFAULT CAST(0 AS bit),
    [Gender] int NULL,
    [BirthDate] datetime2 NULL,
    [Password] nvarchar(15) NOT NULL,
    CONSTRAINT [PK_Clients] PRIMARY KEY ([Id])
);
GO

INSERT INTO [__EFMigrationsHistory] ([MigrationId], [ProductVersion])
VALUES (N'20240726160509_InitialCreate', N'8.0.7');
GO

COMMIT;
GO

