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
		console.log(event)
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
		markdown = markdown.replace(/-/g, '');
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
		margin-left: 1em;
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
