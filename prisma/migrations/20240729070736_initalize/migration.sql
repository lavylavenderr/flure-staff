-- CreateEnum
CREATE TYPE "FlightStatus" AS ENUM ('Scheduled', 'Cancelled', 'Requested');

-- CreateTable
CREATE TABLE "Staff" (
    "id" SERIAL NOT NULL,
    "robloxId" TEXT NOT NULL,
    "discordId" TEXT NOT NULL,
    "robloxUsername" TEXT NOT NULL,
    "discordUsername" TEXT NOT NULL,
    "rankId" INTEGER NOT NULL,
    "suspended" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Staff_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FlightSignup" (
    "id" SERIAL NOT NULL,
    "flightId" INTEGER NOT NULL,
    "staffId" INTEGER NOT NULL,
    "preferredRole" TEXT,

    CONSTRAINT "FlightSignup_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Session" (
    "id" TEXT NOT NULL,
    "ipAddress" TEXT NOT NULL,
    "userAgent" TEXT NOT NULL,
    "expiresAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "staffId" INTEGER NOT NULL,

    CONSTRAINT "Session_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Flight" (
    "id" SERIAL NOT NULL,
    "flightNumber" TEXT NOT NULL,
    "flightStatus" "FlightStatus" NOT NULL,
    "hostId" INTEGER NOT NULL,
    "captainId" INTEGER NOT NULL,

    CONSTRAINT "Flight_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Rank" (
    "id" SERIAL NOT NULL,
    "displayOrder" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "manageFlights" BOOLEAN NOT NULL DEFAULT false,
    "submitReports" BOOLEAN NOT NULL DEFAULT false,
    "manageBlacklist" BOOLEAN NOT NULL DEFAULT false,
    "manageStaff" BOOLEAN NOT NULL DEFAULT false,
    "manageTrainings" BOOLEAN NOT NULL DEFAULT false,
    "manageDocumentation" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Rank_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_Attendees" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Staff_id_key" ON "Staff"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Staff_robloxId_key" ON "Staff"("robloxId");

-- CreateIndex
CREATE UNIQUE INDEX "Staff_discordId_key" ON "Staff"("discordId");

-- CreateIndex
CREATE UNIQUE INDEX "FlightSignup_id_key" ON "FlightSignup"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Flight_id_key" ON "Flight"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Rank_id_key" ON "Rank"("id");

-- CreateIndex
CREATE UNIQUE INDEX "_Attendees_AB_unique" ON "_Attendees"("A", "B");

-- CreateIndex
CREATE INDEX "_Attendees_B_index" ON "_Attendees"("B");

-- AddForeignKey
ALTER TABLE "Staff" ADD CONSTRAINT "Staff_rankId_fkey" FOREIGN KEY ("rankId") REFERENCES "Rank"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FlightSignup" ADD CONSTRAINT "FlightSignup_flightId_fkey" FOREIGN KEY ("flightId") REFERENCES "Flight"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FlightSignup" ADD CONSTRAINT "FlightSignup_staffId_fkey" FOREIGN KEY ("staffId") REFERENCES "Staff"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Session" ADD CONSTRAINT "Session_staffId_fkey" FOREIGN KEY ("staffId") REFERENCES "Staff"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Flight" ADD CONSTRAINT "Flight_hostId_fkey" FOREIGN KEY ("hostId") REFERENCES "Staff"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Flight" ADD CONSTRAINT "Flight_captainId_fkey" FOREIGN KEY ("captainId") REFERENCES "Staff"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_Attendees" ADD CONSTRAINT "_Attendees_A_fkey" FOREIGN KEY ("A") REFERENCES "Flight"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_Attendees" ADD CONSTRAINT "_Attendees_B_fkey" FOREIGN KEY ("B") REFERENCES "Staff"("id") ON DELETE CASCADE ON UPDATE CASCADE;
