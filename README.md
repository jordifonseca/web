# Mi Web - Portafolio Personal

Sitio web personal estático de Jorge Fonseca. Proyecto minimalista construido con HTML, CSS y JavaScript vanilla.

## 📋 Contenido

- **Inicio** (`index.html`) - Página principal con presentación
- **Cómo trabajo** (`como-trabajo.html`) - Descripción de procesos y metodología
- **Servicios** (`servicios.html`) - Catálogo de servicios ofrecidos
- **Contacto** (`contacto.html`) - Formulario de contacto

## 🎨 Características

- Diseño limpio y minimalista basado en el sistema Klosinski
- Sitio 100% estático (HTML, CSS, JavaScript)
- Responsive y optimizado para dispositivos móviles
- Sin dependencias externas ni frameworks pesados

## 📁 Estructura del Proyecto

```
web2/
├── index.html              # Página de inicio
├── como-trabajo.html       # Portfolio
├── servicios.html          # Servicios
├── contacto.html           # Contacto
├── css/
│   └── styles.css         # Estilos globales
├── js/
│   └── main.js            # Scripts principales
└── README.md
```

## 🚀 Cómo usar

1. Clona el repositorio:
```bash
git clone https://github.com/jordifonseca/web.git
cd web
```

2. Abre cualquier archivo HTML en tu navegador o sirve con un servidor local:
```bash
python -m http.server 8000
# O con Node.js
npx http-server
```

3. Visita `http://localhost:8000`

## 📝 Configuración de Contacto

El formulario de contacto en `contacto.html` está preparado para usar **Formspree**. Para activarlo:

1. Ve a [formspree.io](https://formspree.io)
2. Crea una nueva integración con tu email
3. Actualiza el atributo `action` del formulario en `contacto.html` con tu endpoint de Formspree

## 🛠️ Tecnologías

- HTML5
- CSS3
- JavaScript (Vanilla)
- Sistema de diseño: Klosinski

## 📄 Licencia

Proyecto personal - Todos los derechos reservados

---

**Creado por:** Jorge Fonseca
