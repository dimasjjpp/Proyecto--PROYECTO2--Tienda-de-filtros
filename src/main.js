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
//limpiar filtros
const clearFilterButton = document.getElementById('clearFilter')
if (clearFilterButton) {
  clearFilterButton.addEventListener('click', () => {
    const brandSelect = document.getElementById('brand')
    const colorSelect = document.getElementById('color')

    if (brandSelect) brandSelect.value = ''
    if (colorSelect) colorSelect.value = ''

    renderProducts(sneakersArray)
  })
}
//modal nav
document.addEventListener('DOMContentLoaded', () => {
  const modalArrow = document.getElementById('modalArrow')
  const filtersContainer = document.querySelector('.filtersContainer')
  const sidebar = document.querySelector('.sidebarClass')
  console.log(sidebar)

  if (modalArrow && filtersContainer) {
    modalArrow.addEventListener('click', () => {
      filtersContainer.classList.toggle('hidden')
    })
  }
  function toggleSidebar() {
    sidebar.classList.toggle('visible')
  }

  if (sidebar) {
    toggleSidebar()
    window.addEventListener('resize', toggleSidebar)
  }
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

const noResultsMessage = document.createElement('div')
noResultsMessage.classList.add('noResultsMessage')
noResultsMessage.innerHTML =
  '<p>No se han encontrado coincidencias. Aquí tienes algunas sugerencias:</p>'
noResultsMessage.style.display = 'none'
mainSection.appendChild(noResultsMessage)

function renderProducts(productsArray) {
  productsSection.innerHTML = ''

  if (productsArray.length === 0) {
    const randomIndices = new Set()
    while (randomIndices.size < 3) {
      const randomIndex = Math.floor(Math.random() * sneakersArray.length)
      randomIndices.add(randomIndex)
    }
    const randomProductsArray = Array.from(randomIndices).map(
      (index) => sneakersArray[index]
    )

    // Mostrar el mensaje de "No se han encontrado coincidencias"
    noResultsMessage.style.display = 'block'
    productsArray = randomProductsArray
  } else {
    // Ocultar el mensaje si hay productos
    noResultsMessage.style.display = 'none'
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

const filterButton = document.getElementById('filter')
if (filterButton) {
  filterButton.addEventListener('click', () => {
    const selectedColor = document.getElementById('color')?.value || ''
    const selectedBrand = document.getElementById('brand')?.value || ''

    console.log('Color seleccionado:', selectedColor)
    console.log('Marca seleccionada:', selectedBrand)

    const filteredSneakers = sneakersArray.filter((sneaker) => {
      const colorMatch = !selectedColor || sneaker.color === selectedColor
      const brandMatch = !selectedBrand || sneaker.marca === selectedBrand
      return colorMatch && brandMatch
    })

    console.log('Productos filtrados:', filteredSneakers)
    renderProducts(filteredSneakers)
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
