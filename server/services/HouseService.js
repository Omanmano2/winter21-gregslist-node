import { BadRequest } from '@bcwdev/auth0provider/lib/Errors'
import { dbContext } from '../db/DbContext'

class HousesService {
  async getAll() {
    
  const foundHouses = await dbContext.Houses.find().populate('creator', 'name picture')
  return foundHouses
  }
  async getById(houseId) {
    const foundHouse = await dbContext.Houses.findById(houseId).populate('creator', 'name picture')
    if (!foundHouse) {
      throw new BadRequest('Unable to find house')
    }
    return foundHouse
  }

  async create(newHouse){
    const createdHouse = await dbContext.Houses.create(newHouse)
    return createdHouse
  }

  async remove(houseId, creatorId) {
    const foundHouse = await this.getById(houseId)
    if (foundHouse.creatorId.toString() !== creatorId) {
      throw new BadRequest('Unauthorized to delete')
    }
    await foundHouse.remove()
    return foundHouse
  }

  async edit(houseId, creatorId) {
    const houseToEdit = await this.getById(houseId)
    if (carToEdit.creatorId.toString() !== editedHouse.creatorId) {
      throw new BadRequest('Unauthorized to edit')
    }
    houseToEdit.year = editedHouse.year || carToEdit.year
    houseToEdit.location = editedHouse.location || carToEdit.location
    houseToEdit.stories = editedHouse.stories || carToEdit.stories
    houseToEdit.price = editedHouse.price || carToEdit.price
    houseToEdit.color = editedHouse.color || carToEdit.color
    houseToEdit.description = editedHouse.description || carToEdit.description
    houseToEdit.imgUrl = editedHouse.imgUrl || carToEdit.imgUrl

    await houseToEdit.save()
    return houseToEdit
  }
}

export const housesService = new HousesService()