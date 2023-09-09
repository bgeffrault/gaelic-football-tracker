-- CreateTable
CREATE TABLE "Category" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    CONSTRAINT "Category_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Member" (
    "id" SERIAL NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "categoryId" INTEGER NOT NULL,
    "clubId" INTEGER,
    CONSTRAINT "Member_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Club" (
    "id" SERIAL NOT NULL,
    "clubName" TEXT NOT NULL,
    CONSTRAINT "Club_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Team" (
    "id" SERIAL NOT NULL,
    "teamName" TEXT NOT NULL,
    "clubId" INTEGER NOT NULL,
    CONSTRAINT "Team_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Game" (
    "id" SERIAL NOT NULL,
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "duration" INTEGER NOT NULL,
    "gameName" TEXT NOT NULL,
    "gameEnded" BOOLEAN NOT NULL DEFAULT false,
    CONSTRAINT "Game_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "GameScore" (
    "id" SERIAL NOT NULL,
    "teamId" INTEGER NOT NULL,
    "scoreId" INTEGER NOT NULL,
    "gameId" INTEGER NOT NULL,
    CONSTRAINT "GameScore_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Score" (
    "id" SERIAL NOT NULL,
    "accuracy" DOUBLE PRECISION,
    CONSTRAINT "Score_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Shoot" (
    "id" SERIAL NOT NULL,
    "x" INTEGER NOT NULL,
    "y" INTEGER NOT NULL,
    "memberId" INTEGER NOT NULL,
    "scoreId" INTEGER,
    "type" TEXT NOT NULL,
    CONSTRAINT "Shoot_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_MemberToTeam" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_MemberToTeam_AB_unique" ON "_MemberToTeam"("A", "B");

-- CreateIndex
CREATE INDEX "_MemberToTeam_B_index" ON "_MemberToTeam"("B");

-- AddForeignKey
ALTER TABLE
    "Member"
ADD
    CONSTRAINT "Member_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE
    "Member"
ADD
    CONSTRAINT "Member_clubId_fkey" FOREIGN KEY ("clubId") REFERENCES "Club"("id") ON DELETE
SET
    NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE
    "Team"
ADD
    CONSTRAINT "Team_clubId_fkey" FOREIGN KEY ("clubId") REFERENCES "Club"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE
    "GameScore"
ADD
    CONSTRAINT "GameScore_teamId_fkey" FOREIGN KEY ("teamId") REFERENCES "Team"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE
    "GameScore"
ADD
    CONSTRAINT "GameScore_scoreId_fkey" FOREIGN KEY ("scoreId") REFERENCES "Score"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE
    "GameScore"
ADD
    CONSTRAINT "GameScore_gameId_fkey" FOREIGN KEY ("gameId") REFERENCES "Game"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE
    "Shoot"
ADD
    CONSTRAINT "Shoot_memberId_fkey" FOREIGN KEY ("memberId") REFERENCES "Member"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE
    "Shoot"
ADD
    CONSTRAINT "Shoot_scoreId_fkey" FOREIGN KEY ("scoreId") REFERENCES "Score"("id") ON DELETE
SET
    NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE
    "_MemberToTeam"
ADD
    CONSTRAINT "_MemberToTeam_A_fkey" FOREIGN KEY ("A") REFERENCES "Member"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE
    "_MemberToTeam"
ADD
    CONSTRAINT "_MemberToTeam_B_fkey" FOREIGN KEY ("B") REFERENCES "Team"("id") ON DELETE CASCADE ON UPDATE CASCADE;

select
    graphql.rebuild_schema()
