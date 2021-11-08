const fs = require("fs")
const profiles = require("../data/profiles.json")

const errorResHelper = (errorDescription, res, errCode = 400) => {
  res.status(errCode).json({ error: errorDescription })
}

const createProfile = (req, res) => {
  const now2ISO = new Date().toISOString()
  const missing = []
  const newProfile = {
    id: new Date().getTime().toString(),
    name: req.query.name ?? missing.push("'name'"),
    created: {
      idAdmin: req.query.idAdmin ?? missing.push("'idAdmin'"),
      timestamp: now2ISO,
    },
    modified: {},
  }

  if (profiles.filter((el) => el.name === req.query.name).length > 0) {
    return errorResHelper(
      `Profile name '${req.query.name}' already exists.`,
      res
    )
  }

  if (missing.length) {
    return errorResHelper(
      `queryParam ${missing.join(" and ")} is missing.`,
      res
    )
  }

  profiles.push(newProfile)

  fs.writeFile("./data/profiles.json", JSON.stringify(profiles), (err) => {
    if (err) {
      return errorResHelper(err, res)
    }
    return res.status(201).json(newProfile)
  })
}

const updateProfile = (req, res) => {
  const now2ISO = new Date().toISOString()
  const missing = []
  let profileFoundPosition

  profiles.forEach((profile, id) => {
    if (profile.id === parseInt(req.params.id)) {
      profile.name = req.query.name ?? profile.name
      profile.modified = {
        idAdmin: parseInt(req.query.idAdmin ?? missing.push("'idAdmin'")),
        timestamp: now2ISO,
      }
      profileFoundPosition = id + 1
    }
  })

  if (!profileFoundPosition) {
    return errorResHelper(
      `The profile 'id' (${req.params.id}) given does not exist.`,
      res,
      404
    )
  }

  if (missing.length) {
    return errorResHelper(
      `queryParam ${missing.join(" and ")} is missing.`,
      res
    )
  }

  fs.writeFile("./data/profiles.json", JSON.stringify(profiles), (err) => {
    if (err) {
      return errorResHelper(err, res)
    }
    return res.status(200).json(profiles[profileFoundPosition - 1])
  })
}

const deleteProfile = (req, res) => {
  let removedProfile
  profiles.forEach((profile, id) => {
    if (profile.id === parseInt(req.params.id)) {
      removedProfile = profile
      profiles.splice(id, 1)
    }
  })

  if (!removedProfile) {
    return errorResHelper(
      `The profile 'id' (${req.params.id}) given does not exist.`,
      res,
      404
    )
  }

  fs.writeFile("./data/profiles.json", JSON.stringify(profiles), (err) => {
    if (err) {
      return errorResHelper(err, res)
    }
    return res.status(204).json(removedProfile)
  })
}

const listProfiles = (req, res) => {
  if (!profiles.length) {
    return errorResHelper(`The Profiles List seems to be empty.`, res, 404)
  }
  return res.status(200).json(profiles)
}

module.exports = {
  createProfile,
  updateProfile,
  deleteProfile,
  listProfiles,
}
