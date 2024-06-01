<script>
	import {
		show,
		baseURL,
		mindmapSaveAsSvg,
		mindmapSaveAsHtml
	} from './stores.js'
	export let source;
	import url from './url.js';
	
	import { fade, fly } from 'svelte/transition';

	let urlToShare;
	let encodageHash;
	import {
		saveAs
	} from 'file-saver-es';

	let menu;
	let showSlideshow = false;
	let currentSlide = 0;
	let slides = [];

	function menuEdit() {
		showNotification = false;
		show.update(n => true);
	}

	function menuView() {
		show.update(n => false);
	}
	
	
	// Fonction pour récupérer le texte sélectionné
	function getSelectedText() {
		let text = "";
		if (window.getSelection) {
			text = window.getSelection().toString();
		} else if (document.selection && document.selection.type !== "Control") {
			text = document.selection.createRange().text;
		}
		return text;
	}
	
	// Fonction pour remplacer le texte sélectionné
	function replaceSelectedText(replacementText) {
		const selection = window.getSelection();
		if (selection.rangeCount > 0) {
			const range = selection.getRangeAt(0);
			range.deleteContents();
			range.insertNode(document.createTextNode(replacementText));
			// Ajuster la sélection pour inclure le texte inséré
			selection.removeAllRanges();
			selection.addRange(range);
		}
	}


	async function AI(query) {
	
		query = "Tu es un assistant IA qui aide à générer des listes Markmap qui permettent de générer des cartes mentales personnalisées à partir de contenu Markdown. Je vais te donner une instruction et tu vas devoir me répondre le code markdown et uniquement le code markdown, ne fais pas de commentaire en dehors du code. Voici mon instruction : " + query + " Tu dois faire des phrases synthétiques. Tu dois utiliser les outils de mise en page Markdown pour rendre le contenu agréable à lire (mets les mots les plus importants de la phrase en gras avec le double **, en italique avec le simple *, utilise des emojis etc). C'est pour des enfants de 16 ans donc sois pédagogue. Tu dois répondre en Français uniquement !";
			
		
	  try {
		const response = await fetch("https://cors-anywhere.herokuapp.com/https://www.phorm.ai/api/db/generate_answer", {
		  headers: {
			"accept": "*/*",
			"accept-language": "fr,fr-FR;q=0.9,en;q=0.8,en-GB;q=0.7,en-US;q=0.6,ko;q=0.5",
			"content-type": "application/json",
			"priority": "u=1, i",
			"sec-ch-ua": "\"Microsoft Edge\";v=\"125\", \"Chromium\";v=\"125\", \"Not.A/Brand\";v=\"24\"",
			"sec-ch-ua-mobile": "?0",
			"sec-ch-ua-platform": "\"Windows\"",
			"sec-fetch-dest": "empty",
			"sec-fetch-mode": "cors",
			"sec-fetch-site": "same-origin"
		  },
		  referrer: "https://www.phorm.ai/query?projectId=bcad2197-c0ff-4a4e-85e8-c8d4d63505b1&threadId=b9c3ec4a-5bd7-461b-bc66-54c1e9a7a469",
		  referrerPolicy: "strict-origin-when-cross-origin",
		  body: JSON.stringify({
			query: query,
			project: "bcad2197-c0ff-4a4e-85e8-c8d4d63505b1",
			repos: ["https://github.com/xenocoderce/mymarkmap/tree/main"]
		  }),
		  method: "POST",
		  mode: "cors",
		  credentials: "omit"
		});

		if (!response.ok) {
		  throw new Error('Network response was not ok ' + response.statusText);
		}

		const reader = response.body.getReader();
		const decoder = new TextDecoder('utf-8');
		let foundAnswer = false;
		let result = '';

		while (true) {
			const { done, value } = await reader.read();
			if (done) break;

			let decodedChunk = decoder.decode(value, { stream: true });
			if (foundAnswer) {
				result += decodedChunk;
			} else if (decodedChunk.includes('"answer":')) {
				foundAnswer = true;
				result += decodedChunk.substring(decodedChunk.indexOf('"answer":') + 9);
			}
		}

		
		result = result.replace(/[{}`]/g, '');
		result = result.replace(/```/g, '');
		result = result.replace(/\\n/g, "\n");
		result = result.slice(1, -1);
		result = result.substring(1);

		return result;
		
	  } catch (error) {
		console.error('There has been a problem with your fetch operation:', error);
		throw error;
	  }
	}



	

	// Fonction appelée lorsque menuAI est cliqué
	function menuAI(event) {
		event.preventDefault();
		const selectedText = getSelectedText();
		console.log("Texte sélectionné :", selectedText);
		// Comment s'en servir
		const query = selectedText;		
		

		AI(query).then(response => replaceSelectedText(response)).catch(console.error);		
		
		// Focaliser l'élément avec l'ID "editor"
		var editorElement = document.getElementById("editor");
		console.log(editorElement);
		editorElement.focus();

		// Simuler un clic gauche
		editorElement.click();

		// Simuler une pression sur la touche Entrée
		var event = new KeyboardEvent('keydown', {
		  'keyCode': 13,
		  'which': 13
		});
		editorElement.dispatchEvent(event);
	}


	function menuSaveAsSvg() {
		mindmapSaveAsSvg.update(n => true)
	}

	function menuSaveAsHtml() {
		mindmapSaveAsHtml.update(n => true)
	}

	function menuHide() {
		menu.style.display = menu.style.display == 'none' ? 'block' : 'none';
	}

	function menuShare() {
		toastNotification();
		encodageHash = encodeURI(source);
		urlToShare = $baseURL + '/#' + encodageHash
		navigator.clipboard.writeText(urlToShare);
	}

	function handleKeydown(event) {
		if (!$show) {
			if (event.key === 'e') {
				event.preventDefault();
				menu.style.display = 'block';
				menuEdit();
			}
			if (event.key === 's') {
				menu.style.display = 'block';
				menuSaveAsSvg();
			}
			if (event.key === 'h') {
				menu.style.display = 'block';
				menuSaveAsHtml();
			}
			if (event.key === 'l') {
				menu.style.display = 'block';
				menuShare();
			}
			if (event.key == 'm') {
				menuHide();
			}
			if (event.key == ' ') {
				event.preventDefault();
				currentSlide++;
				showNextSlide();
			}
			if (event.key == 'ArrowRight') {
				event.preventDefault();
				currentSlide++;
				showNextSlide();
			}
			if (event.key == 'ArrowLeft') {
				event.preventDefault();
				currentSlide--;
				showPreviousSlide();
			}
		} else {
			if (event.key === 'Escape') {
				menu.style.display = 'block';
				menuView();
			}
		}
	}

	function beforeunload(event) {
		event.preventDefault();
		return event.returnValue = '';
	}

	let showNotification = false;

	function toastNotification() {
		showNotification= true
		setTimeout(function () {
			showNotification= false;
		}, 1500);
	}

	function menuPlay() {
		showSlideshow = true;
		currentSlide = 0;
		slides = source.split('\n').filter(item => item.trim() !== '');
		showNextSlide();
	}

	function showNextSlide() {
		if (currentSlide < slides.length) {
		} else {
			showSlideshow = false;
		}
	}
	function showPreviousSlide() {
		if (currentSlide != 0) {
		} else {
			showSlideshow = false;
		}
	}

	function markdownToHTML(markdown) {

		if (!markdown.includes("iframe")) {
			markdown = markdown.replace(/-/g, '');
		}else{
			if (markdown.startsWith("  - ")) {
				markdown = markdown.substring(1);
				markdown = markdown.substring(1);
				markdown = markdown.substring(1);
				markdown = markdown.substring(1);
			}
		}
		// Replace headers
		markdown = markdown.replace(/^(#+)(.*)$/gm, function(match, p1, p2) {
			var level = p1.length;
			return '<h' + level + '>' + p2.trim() + '</h' + level + '>';
		});

		// Replace fenced code blocks (```)
    	markdown = markdown.replace(/```(?:\r\n|\r|\n)?([^`]+?)```/g, '<pre><code>$1</code></pre>');
		
		// Replace ==highlighted text== with <mark>highlighted text</mark>
		markdown = markdown.replace(/==([^=]+)==/g, '<mark>$1</mark>');


		// Replace emphasis (* and _)
		markdown = markdown.replace(/(\*|_)(.*?)\1/g, '<em>$2</em>');

		// Replace strong emphasis (** and __)
		markdown = markdown.replace(/(\*\*|__)(.*?)\1/g, '<strong>$2</strong>');

		// Replace inline code (`)
		markdown = markdown.replace(/`(.+?)`/g, '<code>$1</code>');

		// Replace links ([...](...))
		markdown = markdown.replace(/\[([^\]]+)]\(([^)]+)\)/g, '<a href="$2">$1</a>');


		// Replace paragraphs
		markdown = '<p>' + markdown.replace(/(?:\r\n|\r|\n){2,}/g, '</p><p>') + '</p>';

		 // Replace double backslashes with <br>
   	     markdown = markdown.replace(/\\\\/g, '<br>');

		return markdown;
	}


</script>

<svelte:window on:keydown={handleKeydown} on:beforeunload={beforeunload} />



{#if showSlideshow}
	<div class="slideshow" style="font-family: system-ui;font-size: 2.5em;">
		{#if slides[currentSlide]}
			<div>{@html markdownToHTML(slides[currentSlide])}</div>
		{/if}
	</div>
{:else}
	<nav id="menu" bind:this={menu}>
		{#if $show}
			<a href="#edit" on:click|preventDefault={menuView}>👓</a>
			<a href="#edit" on:click|preventDefault={menuAI}>🪄</a>
		{:else}
			<a href="#edit" on:click|preventDefault={menuEdit}>✒️</a>
		{/if}
		<a href="#saveHTML" on:click|preventDefault={menuSaveAsHtml}>🌐</a>
		<a href="#saveSVG" on:click|preventDefault={menuSaveAsSvg}>💾</a>
		<a href="#share" on:click|preventDefault={menuShare}>🔗</a>
		{#if showNotification}
			<div id="shareNotification" in:fly="{{ y: 50, duration: 1000 }}" out:fade>Lien copié dans le presse-papier !</div>
		{/if}
		<a href="{$baseURL}" target="_blank" rel="noreferrer">❓</a>
		<a href="#play" on:click|preventDefault={menuPlay}>▶️</a>
	</nav>
{/if}

<style>
	#menu {
		z-index: 1;
		margin: 1em;
		position: absolute;
		font-size: 1.4em;
	}

	#menu a {
		margin-left: 0em;
		text-decoration: none;
	}

	#shareNotification {
		position:absolute;
		width:160px;
		margin-top:1em;
		margin-left:2em;
		background-color: #5cb85c;
		color:white;
		font-size:16px;
		text-align:center;
		padding:10px 2px!important;
		display:table-cell;
		font-family: 'Roboto', 'sans-serif';
		border-radius:5px;
	}

	.slideshow {
		display: flex;
		justify-content: center;
		align-items: center;
		height: 100vh;
		background-color: white;
		color: black;
		font-size: 2em;
		text-align: center;
	}
</style>
