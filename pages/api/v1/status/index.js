function status(request, response) {
  response.status(200).json({ chave: "P. Sherman, 42 Wallaby Way, Sydney" });
}

export default status;
