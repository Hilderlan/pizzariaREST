function unsupported (allowed) {
  return (req, res) => res.status(405).append('Allow', allowed).send(`${req.method} não suportado em ${req.url}`)
}

exports.unsupported = unsupported
