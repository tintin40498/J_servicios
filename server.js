const express = require("express")
const multer = require("multer")
const fs = require("fs")
const path = require("path")

const app = express()
const PORT = process.env.PORT || 3000

app.use(express.static(__dirname))

// Crear carpeta uploads si no existe
const uploadDir = './uploads'
if (!fs.existsSync(uploadDir)){
    fs.mkdirSync(uploadDir)
}

const storage = multer.diskStorage({
    destination: uploadDir,
    filename: (req, file, cb) => {
        cb(null, Date.now() + "-" + file.originalname)
    }
})

const upload = multer({ storage })

// Endpoint para subir fotos
app.post("/upload", upload.single("foto"), (req, res) => {
    res.json({ 
        success: true, 
        message: "Foto subida correctamente",
        file: req.file.filename 
    })
})

// Endpoint para listar fotos
app.get("/fotos", (req, res) => {
    try {
        const files = fs.readdirSync(uploadDir)
        res.json(files)
    } catch (error) {
        res.status(500).json({ error: "Error al leer archivos" })
    }
})

// Servir admin.html en /admin
app.get("/admin", (req, res) => {
    res.sendFile(path.join(__dirname, "admin.html"))
})

app.listen(PORT, () => {
    console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`)
})
