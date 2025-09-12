-- CreateTable
CREATE TABLE `people` (
    `id` INTEGER NOT NULL,
    `name` TEXT NULL,
    `gender` TEXT NULL,
    `height` INTEGER NULL,
    `mass` FLOAT NULL,
    `hair_color` TEXT NULL,
    `planet_id` INTEGER NOT NULL,
    `url` TEXT NULL,
    `created_date` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),

    INDEX `planet_id`(`planet_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `planet` (
    `id` INTEGER NOT NULL,
    `name` TEXT NULL,
    `population` BIGINT NULL,
    `diameter` INTEGER NULL,
    `rotation_period` INTEGER NULL,
    `orbital_period` INTEGER NULL,
    `created_date` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `people` ADD CONSTRAINT `people_ibfk_1` FOREIGN KEY (`planet_id`) REFERENCES `planet`(`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;
