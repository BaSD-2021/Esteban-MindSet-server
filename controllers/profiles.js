const fs = require("fs")
const profiles = require("../data/profiles.json")

const errorResHelper = (errorDescription, res, errCode = 400) => {
  res.status(errCode).json({ error: errorDescription })
}

const createProfile = (req, res) => {
  const now2ISO = new Date().toISOString()
  const missing = []
  const newProfile = {
    idProfile: new Date().getTime().toString(),
    name: req.query.name ?? missing.push("'name'"),
    created: {
      admin: req.query.idAdmin ?? missing.push("'idAdmin'"),
      timestamp: now2ISO,
    },
    modified: {},
  }

  if (missing.length) {
    return errorResHelper(
      `queryParam ${missing.join(" and ")} is missing.`,
      res
    )
  }

  if (profiles.filter((el) => el.name === req.query.name).length > 0) {
    return errorResHelper(
      `Profile name '${req.query.name}' already exists.`,
      res
    )
  }

  profiles.push(newProfile)

  fs.writeFile("./data/profiles.json", JSON.stringify(profiles), (err) => {
    if (err) {
      errorResHelper(err, res)
    } else {
      res.status(201).json(newProfile)
    }
  })
}

const updateProfile = (req, res) => {
  const now2ISO = new Date().toISOString()
  const missing = []
  let profileIdPosition

  profiles.forEach((profile, id) => {
    if (profile.idProfile === parseInt(req.params.id)) {
      profile.name = req.query.name ?? profile.name
      profile.modified = {
        admin: parseInt(req.query.idAdmin ?? missing.push("'idAdmin'")),
        timestamp: now2ISO,
      }
      profileIdPosition = id
    }
  })

  if (missing.length) {
    return errorResHelper(
      `queryParam ${missing.join(" and ")} is missing.`,
      res
    )
  }

  if (!profileIdPosition) {
    return errorResHelper(`The 'idProfile' given does not exist.`, res, 404)
  }

  fs.writeFile("./data/profiles.json", JSON.stringify(profiles), (err) => {
    if (err) {
      errorResHelper(err, res)
    } else {
      res.status(201).json(profiles[profileIdPosition])
    }
  })
}

const deleteProfile = (req, res) => {
  let removedProfile
  console.log(req.params.id)
  profiles.forEach((profile, id) => {
    if (profile.idProfile === parseInt(req.params.id)) {
      removedProfile = profile
      profiles.splice(id, 1)
    }
  })

  if (!removedProfile) {
    return errorResHelper(`The 'idProfile' given does not exist.`, res, 404)
  }

  fs.writeFile("./data/profiles.json", JSON.stringify(profiles), (err) => {
    if (err) {
      errorResHelper(err, res)
    } else {
      res.status(201).json(removedProfile)
    }
  })
}

const listProfiles = (req, res) => {
  if (!profiles.length) {
    return errorResHelper(`The Profiles List seems to be empty.`, res, 404)
  }

  res.status(201).json(profiles)
}

module.exports = {
  createProfile,
  updateProfile,
  deleteProfile,
  listProfiles,
}
