-- CreateEnum
CREATE TYPE "UserStatus" AS ENUM ('active', 'inactive', 'blocked', 'process_verification');

-- CreateEnum
CREATE TYPE "CommonStatus" AS ENUM ('active', 'inactive');

-- CreateTable
CREATE TABLE "app_master_icon" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(100) NOT NULL,
    "code" VARCHAR(50) NOT NULL,
    "status" "CommonStatus" NOT NULL DEFAULT 'active',
    "icon" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "created_by" INTEGER,
    "updated_by" INTEGER,

    CONSTRAINT "app_master_icon_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "app_access_modul" (
    "id" TEXT NOT NULL,
    "role_id" INTEGER NOT NULL,
    "app_category_modul_id" INTEGER NOT NULL,
    "app_modul_id" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "created_by" INTEGER,
    "updated_by" INTEGER,

    CONSTRAINT "app_access_modul_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "app_access_menu" (
    "id" TEXT NOT NULL,
    "role_id" INTEGER NOT NULL,
    "app_category_modul_id" INTEGER NOT NULL,
    "app_modul_id" INTEGER NOT NULL,
    "app_menu_id" INTEGER NOT NULL,
    "permissions" JSONB,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "created_by" INTEGER,
    "updated_by" INTEGER,

    CONSTRAINT "app_access_menu_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "app_category_modul" (
    "id" SERIAL NOT NULL,
    "icon_id" INTEGER,
    "name" VARCHAR(100) NOT NULL,
    "order" INTEGER NOT NULL DEFAULT 0,
    "status" "CommonStatus" NOT NULL DEFAULT 'active',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "created_by" INTEGER,
    "updated_by" INTEGER,

    CONSTRAINT "app_category_modul_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "app_modul" (
    "id" SERIAL NOT NULL,
    "app_category_modul_id" INTEGER NOT NULL,
    "icon_id" INTEGER,
    "code" VARCHAR(50) NOT NULL,
    "name" VARCHAR(100) NOT NULL,
    "order" INTEGER NOT NULL DEFAULT 0,
    "status" "CommonStatus" NOT NULL DEFAULT 'active',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "created_by" INTEGER,
    "updated_by" INTEGER,

    CONSTRAINT "app_modul_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "app_menu" (
    "id" SERIAL NOT NULL,
    "app_menu_id_parent" INTEGER,
    "app_category_modul_id" INTEGER NOT NULL,
    "app_modul_id" INTEGER NOT NULL,
    "icon_id" INTEGER,
    "code" VARCHAR(50) NOT NULL,
    "name" VARCHAR(100) NOT NULL,
    "route" VARCHAR(100) NOT NULL,
    "order" INTEGER NOT NULL DEFAULT 0,
    "status" "CommonStatus" NOT NULL DEFAULT 'active',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "created_by" INTEGER,
    "updated_by" INTEGER,

    CONSTRAINT "app_menu_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "master_category" (
    "id" SERIAL NOT NULL,
    "master_category_id" INTEGER,
    "code" VARCHAR(50) NOT NULL,
    "name" VARCHAR(100) NOT NULL,
    "description" TEXT,
    "status" "CommonStatus" NOT NULL DEFAULT 'active',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "created_by" INTEGER,
    "updated_by" INTEGER,

    CONSTRAINT "master_category_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "master_data" (
    "id" SERIAL NOT NULL,
    "master_data_parent_id" INTEGER,
    "master_category_id" INTEGER NOT NULL,
    "master_category_code" VARCHAR(50) NOT NULL,
    "code" VARCHAR(50) NOT NULL,
    "name" VARCHAR(100) NOT NULL,
    "order" INTEGER NOT NULL DEFAULT 0,
    "description" TEXT,
    "status" "CommonStatus" NOT NULL DEFAULT 'active',
    "parameter1_key" VARCHAR(50),
    "parameter1_value" VARCHAR(50),
    "parameter2_key" VARCHAR(50),
    "parameter2_value" VARCHAR(50),
    "parameter3_key" VARCHAR(50),
    "parameter3_value" VARCHAR(50),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "created_by" INTEGER,
    "updated_by" INTEGER,

    CONSTRAINT "master_data_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "parameter" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(100) NOT NULL,
    "code" VARCHAR(50) NOT NULL,
    "value" TEXT NOT NULL,
    "status" "CommonStatus" NOT NULL DEFAULT 'active',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "created_by" INTEGER,
    "updated_by" INTEGER,

    CONSTRAINT "parameter_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "role" (
    "id" SERIAL NOT NULL,
    "code" VARCHAR(50) NOT NULL,
    "name" VARCHAR(100) NOT NULL,
    "status" "CommonStatus" NOT NULL DEFAULT 'active',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "created_by" INTEGER,
    "updated_by" INTEGER,

    CONSTRAINT "role_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "users" (
    "id" SERIAL NOT NULL,
    "role_id" INTEGER NOT NULL,
    "name" VARCHAR(100) NOT NULL,
    "email" VARCHAR(100),
    "username" VARCHAR(50) NOT NULL,
    "password" TEXT NOT NULL,
    "status" "UserStatus" NOT NULL DEFAULT 'inactive',
    "phone" VARCHAR(15),
    "image" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "created_by" INTEGER,
    "updated_by" INTEGER,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "app_master_icon_code_key" ON "app_master_icon"("code");

-- CreateIndex
CREATE UNIQUE INDEX "app_modul_code_key" ON "app_modul"("code");

-- CreateIndex
CREATE UNIQUE INDEX "master_category_code_key" ON "master_category"("code");

-- CreateIndex
CREATE UNIQUE INDEX "master_data_code_key" ON "master_data"("code");

-- CreateIndex
CREATE UNIQUE INDEX "parameter_code_key" ON "parameter"("code");

-- CreateIndex
CREATE UNIQUE INDEX "role_code_key" ON "role"("code");

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "users_username_key" ON "users"("username");

-- AddForeignKey
ALTER TABLE "app_access_modul" ADD CONSTRAINT "app_access_modul_role_id_fkey" FOREIGN KEY ("role_id") REFERENCES "role"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "app_access_modul" ADD CONSTRAINT "app_access_modul_app_category_modul_id_fkey" FOREIGN KEY ("app_category_modul_id") REFERENCES "app_category_modul"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "app_access_modul" ADD CONSTRAINT "app_access_modul_app_modul_id_fkey" FOREIGN KEY ("app_modul_id") REFERENCES "app_modul"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "app_access_menu" ADD CONSTRAINT "app_access_menu_role_id_fkey" FOREIGN KEY ("role_id") REFERENCES "role"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "app_access_menu" ADD CONSTRAINT "app_access_menu_app_category_modul_id_fkey" FOREIGN KEY ("app_category_modul_id") REFERENCES "app_category_modul"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "app_access_menu" ADD CONSTRAINT "app_access_menu_app_modul_id_fkey" FOREIGN KEY ("app_modul_id") REFERENCES "app_modul"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "app_access_menu" ADD CONSTRAINT "app_access_menu_app_menu_id_fkey" FOREIGN KEY ("app_menu_id") REFERENCES "app_menu"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "app_category_modul" ADD CONSTRAINT "app_category_modul_icon_id_fkey" FOREIGN KEY ("icon_id") REFERENCES "app_master_icon"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "app_modul" ADD CONSTRAINT "app_modul_app_category_modul_id_fkey" FOREIGN KEY ("app_category_modul_id") REFERENCES "app_category_modul"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "app_modul" ADD CONSTRAINT "app_modul_icon_id_fkey" FOREIGN KEY ("icon_id") REFERENCES "app_master_icon"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "app_menu" ADD CONSTRAINT "app_menu_app_category_modul_id_fkey" FOREIGN KEY ("app_category_modul_id") REFERENCES "app_category_modul"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "app_menu" ADD CONSTRAINT "app_menu_app_modul_id_fkey" FOREIGN KEY ("app_modul_id") REFERENCES "app_modul"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "app_menu" ADD CONSTRAINT "app_menu_app_menu_id_parent_fkey" FOREIGN KEY ("app_menu_id_parent") REFERENCES "app_menu"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "app_menu" ADD CONSTRAINT "app_menu_icon_id_fkey" FOREIGN KEY ("icon_id") REFERENCES "app_master_icon"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "master_category" ADD CONSTRAINT "master_category_master_category_id_fkey" FOREIGN KEY ("master_category_id") REFERENCES "master_category"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "master_data" ADD CONSTRAINT "master_data_master_category_id_fkey" FOREIGN KEY ("master_category_id") REFERENCES "master_category"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "master_data" ADD CONSTRAINT "master_data_master_data_parent_id_fkey" FOREIGN KEY ("master_data_parent_id") REFERENCES "master_data"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_role_id_fkey" FOREIGN KEY ("role_id") REFERENCES "role"("id") ON DELETE CASCADE ON UPDATE CASCADE;
