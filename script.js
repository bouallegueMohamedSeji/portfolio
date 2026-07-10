document.addEventListener('DOMContentLoaded', function () {
	const counter3 = document.querySelector('.counter-3')
	const revealItems = document.querySelectorAll('.reveal-up')
	const spotlight = document.querySelector('.spotlight')
	const matrixCanvas = document.querySelector('.matrix-bg')
	const cursorDot = document.querySelector('.cursor-dot')
	const cursorRing = document.querySelector('.cursor-ring')
	const terminalToggle = document.getElementById('terminalToggle')
	const terminalWindow = document.getElementById('terminalWindow')
	const terminalClose = document.getElementById('terminalClose')
	const terminalBody = document.getElementById('terminalBody')
	const terminalInput = document.getElementById('terminalInput')

	for (let i = 0; i < 2; i++) {
		for (let j = 0; j < 10; j++) {
			const div = document.createElement('div')
			div.className = 'num'
			div.textContent = j
			counter3.appendChild(div)
		}
	}

	const finalDiv = document.createElement('div')
	finalDiv.className = 'num'
	finalDiv.textContent = '0'
	counter3.appendChild(finalDiv)

	function animate(counter, duration, delay = 0) {
		const numHeight = counter.querySelector('.num').clientHeight
		const totalDistance =
			(counter.querySelectorAll('.num').length - 1) * numHeight

		gsap.to(counter, {
			y: -totalDistance,
			duration: duration,
			delay: delay,
			ease: 'power2.inOut',
		})
	}

	animate(counter3, 5)
	animate(document.querySelector('.counter-2'), 6)
	animate(document.querySelector('.counter-1'), 2, 4)

	gsap.set(revealItems, { autoAlpha: 0, y: 40 })

	gsap.to(revealItems, {
		autoAlpha: 1,
		y: 0,
		duration: 0.9,
		ease: 'power3.out',
		stagger: 0.08,
		delay: 7.1,
	})

	if (spotlight) {
		window.addEventListener('mousemove', (event) => {
			spotlight.style.setProperty('--x', `${event.clientX}px`)
			spotlight.style.setProperty('--y', `${event.clientY}px`)
		})
	}

	if (cursorDot && cursorRing && !window.matchMedia('(pointer: coarse)').matches) {
		document.body.classList.add('has-custom-cursor')

		const interactiveSelector = 'a, button, input, .terminal-toggle'
		const interactiveElements = document.querySelectorAll(interactiveSelector)

		window.addEventListener('mousemove', (event) => {
			cursorDot.style.opacity = '1'
			cursorRing.style.opacity = '1'

			gsap.to(cursorDot, {
				x: event.clientX,
				y: event.clientY,
				duration: 0,
			})

			gsap.to(cursorRing, {
				x: event.clientX,
				y: event.clientY,
				duration: 0.2,
				ease: 'power2.out',
			})
		})

		window.addEventListener('mouseleave', () => {
			cursorDot.style.opacity = '0'
			cursorRing.style.opacity = '0'
		})

		interactiveElements.forEach((element) => {
			element.addEventListener('mouseenter', () => {
				cursorDot.classList.add('active')
				cursorRing.classList.add('active')
				gsap.to(cursorDot, { scale: 1.6, duration: 0.3, ease: 'power2.out' })
				gsap.to(cursorRing, { scale: 2.2, duration: 0.3, ease: 'power2.out' })
			})

			element.addEventListener('mouseleave', () => {
				cursorDot.classList.remove('active')
				cursorRing.classList.remove('active')
				gsap.to(cursorDot, { scale: 1, duration: 0.3, ease: 'power2.out' })
				gsap.to(cursorRing, { scale: 1, duration: 0.3, ease: 'power2.out' })
			})
		})
	}

	const tiltCards = document.querySelectorAll('.project-card')
	tiltCards.forEach((card) => {
		card.addEventListener('mousemove', (event) => {
			const rect = card.getBoundingClientRect()
			const x = event.clientX - rect.left
			const y = event.clientY - rect.top
			const rotateX = ((y / rect.height) - 0.5) * -10
			const rotateY = ((x / rect.width) - 0.5) * 10
			card.style.transform = `perspective(700px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-6px)`
		})

		card.addEventListener('mouseleave', () => {
			card.style.transform = ''
		})
	})

	const magneticButtons = document.querySelectorAll('.button-primary, .button-ghost')
	const maxPull = 10
	magneticButtons.forEach((button) => {
		button.addEventListener('mousemove', (event) => {
			const rect = button.getBoundingClientRect()
			const relX = event.clientX - rect.left - rect.width / 2
			const relY = event.clientY - rect.top - rect.height / 2
			const dx = Math.max(-maxPull, Math.min(maxPull, relX * 0.3))
			const dy = Math.max(-maxPull, Math.min(maxPull, relY * 0.3))
			button.style.transform = `translate(${dx}px, ${dy - 2}px)`
		})

		button.addEventListener('mouseleave', () => {
			button.style.transform = ''
		})
	})

	if (matrixCanvas) {
		const ctx = matrixCanvas.getContext('2d')
		const chars =
			'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789$+-*/=%""\'#&_(),.;:?!\\|{}<>[]^~'
		const fontSize = 14
		let columns = []
		let intervalId = null

		function resizeMatrix() {
			matrixCanvas.width = window.innerWidth
			matrixCanvas.height = window.innerHeight
			const totalColumns = Math.floor(matrixCanvas.width / fontSize)
			columns = Array.from({ length: totalColumns }, () => 1)
		}

		function drawMatrix() {
			ctx.fillStyle = 'rgba(5, 5, 5, 0.05)'
			ctx.fillRect(0, 0, matrixCanvas.width, matrixCanvas.height)
			ctx.fillStyle = '#00ff9d'
			ctx.font = `${fontSize}px monospace`

			for (let i = 0; i < columns.length; i++) {
				const char = chars.charAt(Math.floor(Math.random() * chars.length))
				ctx.fillText(char, i * fontSize, columns[i] * fontSize)

				if (
					columns[i] * fontSize > matrixCanvas.height &&
					Math.random() > 0.975
				) {
					columns[i] = 0
				}

				columns[i]++
			}
		}

		resizeMatrix()
		intervalId = window.setInterval(drawMatrix, 33)
		window.addEventListener('resize', resizeMatrix)

		window.addEventListener('beforeunload', () => {
			window.clearInterval(intervalId)
		})
	}

	const commands = {
		help: 'Available commands: whoami, skills, contact, resume, clear, sudo',
		whoami: 'Med Seji Bouallegue - Software Engineering Student @ ESPRIT',
		skills: 'Java, Python, PHP, Symfony, FastAPI, MySQL, Cisco/GNS3/GLPI',
		contact: 'Email: MohamedSeji.Bouallegue@esprit.tn | Location: Tunis, Tunisia',
		resume: 'Download it at /resume.pdf',
		sudo: 'Nice try. This incident will be reported.',
	}

	function appendTerminalLine(type, content) {
		const line = document.createElement('div')
		line.className = `line ${type}`
		line.textContent = content
		terminalBody.insertBefore(line, terminalBody.lastElementChild)
		terminalBody.scrollTop = terminalBody.scrollHeight
	}

	if (terminalToggle && terminalWindow && terminalClose && terminalInput) {
		terminalToggle.addEventListener('click', () => {
			terminalWindow.classList.remove('hidden')
			terminalInput.focus()
		})

		terminalClose.addEventListener('click', () => {
			terminalWindow.classList.add('hidden')
		})

		terminalInput.addEventListener('keydown', (event) => {
			if (event.key !== 'Enter') {
				return
			}

			const value = terminalInput.value.trim()
			const key = value.toLowerCase()

			if (value) {
				appendTerminalLine('user', `guest@msb-os:~$ ${value}`)
			}

			if (key === 'clear') {
				const lines = terminalBody.querySelectorAll('.line')
				lines.forEach((line) => line.remove())
			} else if (commands[key]) {
				appendTerminalLine('system', commands[key])
			} else if (value) {
				appendTerminalLine('error', `Command not found: ${key}`)
			}

			terminalInput.value = ''
		})
	}

	renderSkillRadar('skillRadar', [
		{ label: 'Programming', value: 90 },
		{ label: 'Frameworks', value: 88 },
		{ label: 'Tooling', value: 85 },
		{ label: 'Networking', value: 62 },
	])
})

function renderSkillRadar(containerId, data) {
	const container = document.getElementById(containerId)
	if (!container) return

	const size = 260
	const center = size / 2
	const maxRadius = size * 0.34
	const ringCount = 4
	const angleStep = (Math.PI * 2) / data.length
	const svgNS = 'http://www.w3.org/2000/svg'

	function pointAt(index, fraction) {
		const angle = angleStep * index - Math.PI / 2
		const r = maxRadius * fraction
		return { x: center + r * Math.cos(angle), y: center + r * Math.sin(angle) }
	}

	const svg = document.createElementNS(svgNS, 'svg')
	svg.setAttribute('viewBox', `0 0 ${size} ${size}`)

	for (let level = 1; level <= ringCount; level++) {
		const points = data.map((_, i) => pointAt(i, level / ringCount))
		const ring = document.createElementNS(svgNS, 'polygon')
		ring.setAttribute('points', points.map((p) => `${p.x},${p.y}`).join(' '))
		ring.setAttribute('class', 'radar-grid')
		svg.appendChild(ring)
	}

	data.forEach((_, i) => {
		const outer = pointAt(i, 1)
		const axis = document.createElementNS(svgNS, 'line')
		axis.setAttribute('x1', center)
		axis.setAttribute('y1', center)
		axis.setAttribute('x2', outer.x)
		axis.setAttribute('y2', outer.y)
		axis.setAttribute('class', 'radar-grid')
		svg.appendChild(axis)
	})

	const dataPoints = data.map((item, i) => pointAt(i, item.value / 100))
	const shape = document.createElementNS(svgNS, 'polygon')
	shape.setAttribute('points', dataPoints.map((p) => `${p.x},${p.y}`).join(' '))
	shape.setAttribute('class', 'radar-shape')
	svg.appendChild(shape)

	dataPoints.forEach((p) => {
		const dot = document.createElementNS(svgNS, 'circle')
		dot.setAttribute('cx', p.x)
		dot.setAttribute('cy', p.y)
		dot.setAttribute('r', 3)
		dot.setAttribute('class', 'radar-dot')
		svg.appendChild(dot)
	})

	data.forEach((item, i) => {
		const labelPoint = pointAt(i, 1.32)
		const angle = angleStep * i - Math.PI / 2
		const cos = Math.cos(angle)
		const text = document.createElementNS(svgNS, 'text')
		text.setAttribute('x', labelPoint.x)
		text.setAttribute('y', labelPoint.y)
		text.setAttribute('class', 'radar-label')
		text.setAttribute('text-anchor', cos > 0.3 ? 'start' : cos < -0.3 ? 'end' : 'middle')
		text.setAttribute('dominant-baseline', 'middle')
		text.textContent = item.label
		svg.appendChild(text)
	})

	container.innerHTML = ''
	container.appendChild(svg)
}

gsap.to('.digit', {
	top: '-150px',
	stagger: {
		amount: 0.25,
	},
	delay: 6,
	duration: 1,
	ease: 'power4.inOut',
})

gsap.from('.loader-1', {
	width: 0,
	duration: 6,
	ease: 'power2.inOut',
})

gsap.from('.loader-2', {
	width: 0,
	delay: 1.9,
	duration: 2,
	ease: 'power2.inOut',
})

gsap.to('.loader', {
	background: 'none',
	delay: 6,
	duration: 0.1,
})

gsap.to('.loader-1', {
	rotate: 90,
	y: -50,
	duration: 0.5,
	delay: 6,
})

gsap.to('.loader-2', {
	x: -75,
	y: 75,
	duration: 0.5,
	delay: 6,
})

gsap.to('.loader', {
	scale: 40,
	duration: 1,
	delay: 7,
	ease: 'power2.inOut',
})

gsap.to('.loader', {
	rotate: 45,
	y: 500,
	x: 2000,
	duration: 1,
	delay: 7,
	ease: 'power2.inOut',
})

gsap.to('.loading-screen', {
	opacity: 0,
	duration: 0.5,
	delay: 7.5,
	ease: 'power1.inOut',
})
