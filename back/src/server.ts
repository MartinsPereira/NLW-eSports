import express, { response } from "express";
import cors from 'cors'



import {PrismaClient } from '@prisma/client'

import { convertHourstringToMinutes } from "./utils/convert-hour-string-to-minutes";
import { convertMinutesToHourString } from "./utils/conver-minutes-to-hour-string";

const app = express();

app.use(express.json())
app.use(cors())

const prisma = new PrismaClient({
  log: ['query']
});

app.get('/games', async (req, res) => {
  const games = await prisma.game.findMany({
    include: {
      _count: {
        select: {
          ads: true,
        }
      }
    }
  });
  return res.json(games)
})

app.post('/games/:id/ads', async (req, res) => {
  const gameId = req.params.id;
  const body = req.body;

  const ad = await prisma.ad.create({
    data: {
      gameId,
      name: body.name,
      yearsPlaying: body.yearsPlaying,
      Discord: body.Discord,
      weekDays: body.weekDays.join(','),
      hoursStart: convertHourstringToMinutes(body.hoursStart) ,
      hourEnd: convertHourstringToMinutes(body.hourEnd),
      useVoiceChannel: body.useVoiceChannel,
    }
  })

  return res.status(201).json(ad)
})

app.get('/games/:id/ads', async (req, res) => {
  const gameId = req.params.id

  const adss = await prisma.ad.findMany({
    select: {
      id: true,
      name: true,
      weekDays: true,
      useVoiceChannel: true,
      yearsPlaying: true,
      hourEnd: true,
      hoursStart: true,
    },
    where: {
      gameId: gameId,
    },
    orderBy: {
      createdAt: 'desc'
    }
  });
  return res.json(adss.map(ad => {
    return {
      ...ad,
      weekDays: ad.weekDays.split(','),
      hoursStart: convertMinutesToHourString(ad.hoursStart),
      hourEnd: convertMinutesToHourString(ad.hourEnd)
    }
  }))
})

app.get('/ads/:id/discord', async (req, res) => {
  const adId = req.params.id

  const ad = await prisma.ad.findUniqueOrThrow({
    select: {
      Discord: true,
    },
    where: {
      id: adId
    }
  })
  return res.json({
    discord: ad.Discord,
  })
})

app.listen(3333);  