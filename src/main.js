import { headerContent } from './components/header'
import { banners } from './components/banners'
import { sidebarContent } from '../src/components/sidebar'
import { footerData } from '../src/components/footer'
import { sneakersArray } from '../public/resources/sneakers'

// header
const headerSection = document.createElement('nav')
headerSection.innerHTML = headerContent
document.body.appendChild(headerSection)

// sidebar
const sidebarSection = document.createElement('aside')
sidebarSection.classList.add('sidebarClass')
sidebarSection.innerHTML = sidebarContent
document.body.appendChild(sidebarSection)

//main
const mainSection = document.createElement('main')

//filtros
function populateFilterOptions(containerId, options) {
  const container = document.getElementById(containerId)
  if (!container) return

  options.forEach((option) => {
    const optionElement = document.createElement('option')
    optionElement.value = option
    optionElement.textContent = option
    container.appendChild(optionElement)
  })
}

// Opciones de marca
const brandOptions = []
sneakersArray.forEach((sneaker) => {
  if (!brandOptions.includes(sneaker.marca)) {
    brandOptions.push(sneaker.marca)
  }
})

// Opciones de color
const colorOptions = []
sneakersArray.forEach((sneaker) => {
  if (!colorOptions.includes(sneaker.color)) {
    colorOptions.push(sneaker.color)
  }
})

// filtros
populateFilterOptions('brand', brandOptions)
populateFilterOptions('color', colorOptions)

//modal nav
document.addEventListener('DOMContentLoaded', () => {
  const modalArrow = document.getElementById('modalArrow')
  const filtersContainer = document.querySelector('.filtersContainer')

  if (modalArrow && filtersContainer) {
    modalArrow.addEventListener('click', () => {
      filtersContainer.classList.toggle('hidden')
    })
  }
})
//modal nav @media 768px
document.addEventListener('DOMContentLoaded', () => {
  const modalArrow = document.getElementById('modalArrow')
  const sidebar = document.querySelector('.sidebarClass')

  // Alternar la visibilitat del sidebar
  function toggleSidebar() {
    sidebar.classList.toggle('visible')
  }

  // Configurar el comportament segons l'amplada de la pantalla
  /*  function handleSidebarToggle() {
    if (window.innerWidth <= 768) {
      // Assegurar que l'event listener estigui assignat
      modalArrow.addEventListener('click', toggleSidebar)
    } else {
      // Eliminar el listener i ocultar el sidebar si cal
      modalArrow.removeEventListener('click', toggleSidebar)
      sidebar.classList.remove('visible') // Assegurar que el sidebar estigui amagat
    }
  } */

  // Cridar la funció inicialment per configurar el comportament
  handleSidebarToggle()

  // Reassignar el comportament en redimensionar la pantalla
  window.addEventListener('resize', handleSidebarToggle)
})

//banner
function renderBanners(banners) {
  const screenSize = window.matchMedia('(min-width:1200px)').matches
  const bannerSection = document.createElement('section')
  bannerSection.classList.add('bannerSectionClass')

  banners.forEach((banner) => {
    if (
      (screenSize && banner.size === 'middle') ||
      (!screenSize && banner.size === 'full')
    ) {
      const img = document.createElement('img')
      img.classList.add('bannerUrl')
      img.src = banner.url
      img.alt = `Banner ${banner.size}`
      bannerSection.appendChild(img)
    }
  })

  mainSection.appendChild(bannerSection)
}
renderBanners(banners)

//renderizado productos
const productsSection = document.createElement('section')
productsSection.classList.add('productContainerClass')

function renderProducts(productsArray) {
  productsSection.innerHTML = ''

  if (productsArray.length === 0) {
    productsSection.innerHTML =
      '<p>No hay productos que coincidan con la búsqueda.</p>'
    return
  }

  productsArray.forEach((product) => {
    const productCard = document.createElement('div')
    productCard.classList.add('card')
    productCard.innerHTML = `
      <img src="${product.url}" alt="${product.marca}" class="card-image" />
      <div class="cardTextContainer">
        <h2 class="card-title">${product.marca}</h2>
        <div class="titleCardContainer">
          <p class="card-colour">${product.color}</p>
          <p class="card-price">${product.precio}€</p>
        </div>
        <button class="card-button">Agregar al carrito</button>
      </div>
    `
    productsSection.appendChild(productCard)
  })
}

renderProducts(sneakersArray)
mainSection.appendChild(productsSection)
document.body.appendChild(mainSection)
//section
// footer
const footerSection = document.createElement('footer')

function renderFooter(data) {
  data.forEach((section) => {
    const ulContainer = document.createElement('ul')
    section.links.forEach((link) => {
      const liContainer = document.createElement('li')
      liContainer.innerHTML = link
      ulContainer.appendChild(liContainer)
    })
    footerSection.appendChild(ulContainer)
  })
}
renderFooter(footerData)
document.body.appendChild(footerSection)

//filtrado
const filterButton = document.getElementById('filter')
if (filterButton) {
  filterButton.addEventListener('click', () => {
    const selectedColor = document.getElementById('color')?.value || ''
    const selectedBrand = document.getElementById('brand')?.value || ''

    const filteredSneakers = sneakersArray.filter((sneaker) => {
      const colorMatch = !selectedColor || sneaker.color === selectedColor
      const brandMatch = !selectedBrand || sneaker.marca === selectedBrand
      return colorMatch && brandMatch
    })

    renderProducts(filteredSneakers)
  })
}
