-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public_crags" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "longitude" TEXT NOT NULL,
    "latitude" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "public_crags_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "crags" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "longitude" TEXT NOT NULL,
    "latitude" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "crags_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "active_crags" (
    "id" TEXT NOT NULL,
    "cragId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "active_crags_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user_preferences" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "ideal_temp_low" INTEGER NOT NULL DEFAULT 3,
    "ideal_temp_high" INTEGER NOT NULL DEFAULT 8,
    "ideal_humidity_low" INTEGER NOT NULL DEFAULT 40,
    "ideal_humidity_high" INTEGER NOT NULL DEFAULT 60,
    "good_temp_low" INTEGER NOT NULL DEFAULT -2,
    "good_temp_high" INTEGER NOT NULL DEFAULT 12,
    "good_humidity_low" INTEGER NOT NULL DEFAULT 0,
    "good_humidity_high" INTEGER NOT NULL DEFAULT 70,
    "compromise_temp_low" INTEGER NOT NULL DEFAULT -5,
    "compromise_temp_high" INTEGER NOT NULL DEFAULT 18,
    "compromise_humidity_low" INTEGER NOT NULL DEFAULT 0,
    "compromise_humidity_high" INTEGER NOT NULL DEFAULT 80,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "user_preferences_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- AddForeignKey
ALTER TABLE "crags" ADD CONSTRAINT "crags_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "active_crags" ADD CONSTRAINT "active_crags_cragId_fkey" FOREIGN KEY ("cragId") REFERENCES "crags"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_preferences" ADD CONSTRAINT "user_preferences_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
