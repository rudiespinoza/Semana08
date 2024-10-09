import express from 'express';
import morgan from 'morgan';
import { engine } from 'express-handlebars';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import clientesRoutes from './routes/clientes.routes.js'; // Importar las rutas de clientes
import marcaRoutes from './routes/marca.routes.js'; // Importar las rutas de marcas
import categoriaRoutes from './routes/categoria.routes.js'; // Importar las rutas de categorías
import proveedorRoutes from './routes/proveedor.routes.js'; // Importar las rutas de proveedores

// Inicialización
const app = express();
const __dirname = dirname(fileURLToPath(import.meta.url));

// Configuración
app.set('port', process.env.PORT || 3000);

// Configurando carpeta para las vistas
app.set('views', join(__dirname, 'views'));

// Configurar motor de plantilla
app.engine('.hbs', engine({
    defaultLayout: 'main',
    layoutsDir: join(app.get('views'), 'layouts'),
    partialsDir: join(app.get('views'), 'partials'),
    extname: '.hbs'
}));
app.set('view engine', '.hbs');

// Middlewares
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Configurar archivos públicos
app.use(express.static(join(__dirname, 'public')));

// Rutas
app.use('/', clientesRoutes); // Usar las rutas de clientes
app.use('/marca', marcaRoutes); // Usar las rutas de marcas
app.use('/categoria', categoriaRoutes); // Usar las rutas de categorías
app.use('/proveedor', proveedorRoutes); // Usar las rutas de proveedores

app.get('/', (req, res) => {
    res.render('index'); // Renderiza la vista 'index'
});

// Ejecutar servidor
app.listen(app.get('port'), () => {
    console.log('Cargando el puerto', app.get('port'));
});
