/* Actual screenshots can be read at full size, without leaving their case. */
(() => {
  'use strict';
  const images=[...document.querySelectorAll('img[data-enlarge]')];
  if (!images.length || !window.PortfolioShell) return;
  const en=document.documentElement.lang.startsWith('en');
  const viewer=document.createElement('div');
  viewer.id='portfolioImageViewer';
  viewer.className='portfolio-image-viewer';
  viewer.dataset.portfolioDialog='';
  viewer.setAttribute('aria-label',en?'Project screenshot':'Captura do projeto');
  viewer.hidden=true;
  viewer.innerHTML='<div class="image-viewer-toolbar"><p id="imageViewerCaption"></p><button type="button" class="image-viewer-zoom" aria-pressed="false"><i class="fa-solid fa-magnifying-glass-plus" aria-hidden="true"></i><span></span></button><button type="button" class="js-popup-close" aria-label="'+(en?'Close image':'Fechar imagem')+'"><i class="fa-solid fa-xmark" aria-hidden="true"></i></button></div><div class="image-viewer-media"><img alt=""></div>';
  document.body.append(viewer);
  const image=viewer.querySelector('img');
  const caption=viewer.querySelector('p');
  const zoom=viewer.querySelector('.image-viewer-zoom');
  const media=viewer.querySelector('.image-viewer-media');
  function fit(){viewer.classList.remove('original-size');zoom.setAttribute('aria-pressed','false');zoom.querySelector('span').textContent=en?'Original size':'Tamanho original';}
  fit();
  zoom.addEventListener('click',()=>{
    const original=!viewer.classList.contains('original-size');
    viewer.classList.toggle('original-size',original);
    zoom.setAttribute('aria-pressed',String(original));
    zoom.querySelector('span').textContent=original?(en?'Fit to screen':'Ajustar à tela'):(en?'Original size':'Tamanho original');
    media.scrollTop=0;media.scrollLeft=0;
  });
  images.forEach(source=>{
    source.tabIndex=0;source.setAttribute('role','button');source.setAttribute('aria-haspopup','dialog');source.setAttribute('aria-controls',viewer.id);
    source.setAttribute('aria-label',source.alt+'. '+(en?'Enlarge screenshot':'Ampliar captura'));
    const open=()=>{fit();image.src=source.currentSrc||source.src;image.alt=source.alt;caption.textContent=source.alt;window.PortfolioShell.openDialog(viewer,source);};
    source.addEventListener('click',open);
    source.addEventListener('keydown',event=>{if(event.key==='Enter'||event.key===' '){event.preventDefault();open();}});
  });
  window.PortfolioShell.init();
})();
