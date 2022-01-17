import BaseController from '../utils/BaseController'
import { Auth0Provider } from '@bcwdev/auth0provider'
import { housesService } from "../services/HouseService"

export class HouseContoller extends BaseController {
  constructor(data) {
    super ('api/houses')
    this.router
    .get('', this.getAll)
    .get('/:id', this.getById)
    .use(Auth0Provider.getAuthorizedUserInfo)
    .post('', this.create)
    .delete('/:id', this.remove)
    .put('/:id', this.edit)
  }

  async getAll(req, res, next) {
    try {
      const houses = await houseService.getAll()
      res.send(houses)
    } catch (error) {
      next(error)
    }
  }

  async getById(req, res, next) {
    try {
      const house = await housesService.getById(req.params.id)
      res.send(house)
    } catch (error) {
      next(error)
    }
  }

  async create(req, res, next) {
    try {
      req.body.creatorId = req.userInfo.id
      const createdHouse = await housesService.create(req.body )
      res.send(createdHouse)
    } catch (error) {
      next(error)
    }
  }

  async remove(req, res, next) {
    try {
      const deletedCar = await housesService.remove(req.params.id, req.userInfo.id)
      res.send(deletedCar)
    } catch (error) {
      next(error)
    }
  }

  async edit(req, res, next) {
    try {
      req.body.creatorId = req.userInfo.id
      const editedHouse = await housesService.edit(req.params.id, req.body)
      res.send(editedHouse)
    } catch (error) {
      next(error)
    }
  }
}