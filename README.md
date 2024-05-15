# FitTrack - 筋トレ記録プラットフォーム
 FitTrackは、筋トレの記録を簡単に管理できるプラットフォームです。<br >
 
 ![スクリーンショット 2024-03-28 15 35 03](https://github.com/Supuky/Fit-Track/assets/70472437/5ea95bfb-7a09-48d9-866d-930a4bbd57d1)

 以下の特徴を提供しています:
 - **トレーニングデータの入力**: ユーザーは使用した重量、レップ数（回数）、セット数などのトレーニングデータを入力できます。
 - **グラフでの成長の可視化**: FitTrackはトレーニングごとの記録をグラフで表示し、ユーザーの成長を追跡できるようにします。
 - **モチベーションの維持**: 自分自身のモチベーションを高めるために、進捗の確認ができます。
 - **体重管理**: 体重と体脂肪を記録することができ、グラフで確認することができます。

# URL
 https://fit-track-seven.vercel.app/<br >

# DB設計
```mermaid
  erDiagram
    profiles ||--o{ bodyMeasurements : "ユーザーは複数の身体記録を持つ" 
    profiles ||--o{ workouts : "ユーザーは複数のトレーニング記録を持つ" 
    profiles ||--o{ exercises : "ユーザーは複数のトレーニング種目を持つ" 
    muscleGroups ||--o{ exercises : "筋肉の部位は複数のトレーニング種目を持つ" 
    exercises ||--o{ workoutDetails : "種目は筋肉の部位ごとに複数のトレーニング種目を持つ" 
    workouts ||--o{ workoutDetails : "トレーニングは複数のトレーニング詳細の記録を持つ" 
    workoutDetails ||--o{ setDetails : "トレーニング詳細は複数のセットの詳細の記録を持つ" 

    profiles {
        string id PK
        string name
        decimal height
    }

    bodyMeasurements {
        int id PK
        references userId FK 
        decimal weight
        decimal bodyFatParcentage
        timestamp measuredAt
        timestamp createdAt
        timestamp updatedAt
    }

    workouts {
        int id PK
        references userId FK
        timestamp workoutedAt
        timestamp createdAt
        timestamp updatedAt
    }

    workoutDetails {
        int id PK
        references workoutId FK
        references exerciseId FK 
        string memo
        timestamp createdAt
        timestamp updatedAt
    }

    setDetails {
        int id PK
        references workoutDetailId FK
        int setNumber
        int reps
        decimal weight
        timestamp createdAt
        timestamp updatedAt
    }

    muscleGroups {
        int id PK
        string name
        timestamp createdAt
        timestamp updatedAt
    }

    exercises {
        int id PK
        references userId FK
        references muscleGroupId FK
        string name
        timestamp createdAt
        timestamp updatedAt
    }
```

# 使用技術
 - TypeScript
 - Next.js 14.1.0
 - React 18
 - Tailwindcss 3.3.0
 - Prisma 5.9.1
 - Supabase
 - PostgresSQL 3.4.3