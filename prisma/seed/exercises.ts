import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const exercises = async () => {
  const EXERCISES = [
    {muscleId: 1, name: "ベンチプレス"}, 
    {muscleId: 1, name: "チェストプレス"},
    {muscleId: 1, name: "ダンベルプレス"},
    {muscleId: 1, name: "ダンベルフライ"},
    {muscleId: 2, name: "ラットプルダウン"},
    {muscleId: 2, name: "ロー・ロー"},
    {muscleId: 2, name: "チンニング"},
    {muscleId: 2, name: "デットリフト"},
    {muscleId: 3, name: "アームカール"},
    {muscleId: 3, name: "ダンベル"},
    {muscleId: 4, name: "サイドレイズ"},
    {muscleId: 4, name: "リア・デルトイド"},
    {muscleId: 4, name: "ショルダープレス"},
    {muscleId: 5, name: "アブローラー"},
    {muscleId: 6, name: "スクワット"},
    {muscleId: 6, name: "レッグプレス"},
    {muscleId: 6, name: "レッグカール"},
    {muscleId: 6, name: "レッグエクステンション"},
  ];
  const muscleGroups = await prisma.muscleGroups.findMany();

  for(const exercise of EXERCISES) {
    for(const muscle of muscleGroups) {
      if(muscle.id == exercise.muscleId) {
        await prisma.exercises.create({
          data: {
            name: exercise.name,
            muscleGroupId: muscle.id
          },
        });
      };
    };
  };
};