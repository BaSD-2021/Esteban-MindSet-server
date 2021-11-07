const fs = require("fs")
const profiles = require("../data/profiles.json")

const errorResHelper = (errorDescription, res) => {
  res.status(400).send(
    JSON.stringify({
      error: errorDescription,
    })
  )
}

const createProfile = (req, res) => {
  const formattedNow2ISO = new Date()
    .toISOString()
    .split("T")
    .join(" ")
    .split(".")[0]
  const missing = []
  const newProfile = {
    idProfile: new Date().getTime().toString(),
    name: req.query.name ?? missing.push("'name'"),
    created: {
      admin: req.query.idAdmin ?? missing.push("'idAdmin'"),
      timestamp: formattedNow2ISO,
    },
    modified: [],
  }

  if (missing.length) {
    errorResHelper(`queryParam ${missing.join(" and ")} is missing.`, res)
    return
  }

  if (profiles.filter((el) => el.name === req.query.name).length > 0) {
    errorResHelper(`Profile name '${req.query.name}' already exists.`, res)
    return
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
  const formattedNow2ISO = new Date()
    .toISOString()
    .split("T")
    .join(" ")
    .split(".")[0]
  const missing = []
  let profileIdPosition

  profiles.forEach((profile, id) => {
    if (profile.idProfile === parseInt(req.params.id)) {
      profile.name = req.query.name ?? profile.name
      profile.modified.push({
        admin: parseInt(req.query.idAdmin ?? missing.push("'idAdmin'")),
        timestamp: formattedNow2ISO,
      })
      profileIdPosition = id
    }
  })

  if (missing.length) {
    errorResHelper(`queryParam ${missing.join(" and ")} is missing.`, res)
    return
  }

  if (!profileIdPosition) {
    errorResHelper(`The 'idProfile' given does not exist.`, res)
    return
  }

  fs.writeFile("./data/profiles.json", JSON.stringify(profiles), (err) => {
    if (err) {
      errorResHelper(err, res)
    } else {
      res.status(201).json(profiles[profileIdPosition])
    }
  })
}

const removeProfile = (req, res) => {
  let profileIdPosition
  let removedProfile = {}

  profiles.forEach((profile, id) => {
    if (profile.idProfile === parseInt(req.params.id)) {
      removedProfile = profile
      profileIdPosition = id
      profiles.splice(id, 1)
    }
  })

  if (!profileIdPosition) {
    errorResHelper(`The 'idProfile' given does not exist.`, res)
    return
  }

  fs.writeFile("./data/profiles.json", JSON.stringify(profiles), (err) => {
    if (err) {
      errorResHelper(err, res)
    } else {
      res.status(201).json(removedProfile)
    }
  })
}

const listProfiles = (req, res) => {}

module.exports = {
  createProfile,
  updateProfile,
  removeProfile,
  listProfiles,
}
