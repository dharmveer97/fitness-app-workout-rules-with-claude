import { Router } from 'express'
import { z } from 'zod'
import { PrismaClient } from '@prisma/client'
import { authenticate, AuthRequest } from '../middleware/auth'

const router = Router()
const prisma = new PrismaClient()

const workoutSchema = z.object({
  name: z.string(),
  type: z.string(),
  duration: z.number().int().positive(),
  caloriesBurned: z.number().int().optional(),
  exercises: z.array(z.any()),
  notes: z.string().optional(),
  date: z.string().datetime().optional(),
})

// GET /api/workouts
router.get('/', authenticate, async (req: AuthRequest, res, next) => {
  try {
    const { startDate, endDate, limit = '50' } = req.query

    const where: any = { userId: req.userId }

    if (startDate || endDate) {
      where.date = {}
      if (startDate) where.date.gte = new Date(startDate as string)
      if (endDate) where.date.lte = new Date(endDate as string)
    }

    const workouts = await prisma.workout.findMany({
      where,
      orderBy: { date: 'desc' },
      take: parseInt(limit as string),
    })

    res.json(workouts)
  } catch (error) {
    next(error)
  }
})

// POST /api/workouts
router.post('/', authenticate, async (req: AuthRequest, res, next) => {
  try {
    const data = workoutSchema.parse(req.body)

    const workout = await prisma.workout.create({
      data: {
        ...data,
        userId: req.userId!,
        date: data.date ? new Date(data.date) : new Date(),
      },
    })

    res.status(201).json(workout)
  } catch (error) {
    next(error)
  }
})

// GET /api/workouts/:id
router.get('/:id', authenticate, async (req: AuthRequest, res, next) => {
  try {
    const workout = await prisma.workout.findFirst({
      where: {
        id: req.params.id,
        userId: req.userId,
      },
    })

    if (!workout) {
      return res.status(404).json({ error: 'Workout not found' })
    }

    res.json(workout)
  } catch (error) {
    next(error)
  }
})

// PUT /api/workouts/:id
router.put('/:id', authenticate, async (req: AuthRequest, res, next) => {
  try {
    const data = workoutSchema.partial().parse(req.body)

    const workout = await prisma.workout.updateMany({
      where: {
        id: req.params.id,
        userId: req.userId,
      },
      data: {
        ...data,
        date: data.date ? new Date(data.date) : undefined,
      },
    })

    if (workout.count === 0) {
      return res.status(404).json({ error: 'Workout not found' })
    }

    res.json({ message: 'Workout updated' })
  } catch (error) {
    next(error)
  }
})

// DELETE /api/workouts/:id
router.delete('/:id', authenticate, async (req: AuthRequest, res, next) => {
  try {
    const workout = await prisma.workout.deleteMany({
      where: {
        id: req.params.id,
        userId: req.userId,
      },
    })

    if (workout.count === 0) {
      return res.status(404).json({ error: 'Workout not found' })
    }

    res.json({ message: 'Workout deleted' })
  } catch (error) {
    next(error)
  }
})

export default router
