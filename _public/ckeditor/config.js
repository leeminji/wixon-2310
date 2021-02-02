/**
 * @license Copyright (c) 2003-2020, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see https://ckeditor.com/legal/ckeditor-oss-license
 */

CKEDITOR.editorConfig = function( config ) {
	// Define changes to default configuration here. For example:
	config.language = 'ko';
	// config.uiColor = '#AADC6E';
	config.toolbar =  [{
		name: 'clipboard',
		items: ['Undo', 'Redo']
	  },
	//   {
	// 	name: 'styles',
	// 	items: ['Styles', 'Format']
	//   },
	  {
		name: 'basicstyles',
		items: [ 'Font','FontSize','Bold', 'Italic', 'Strike', '-', 'RemoveFormat']
	  },
	  {
		name: 'paragraph',
		items: ['NumberedList', 'BulletedList', '-', 'Outdent', 'Indent', '-', 'Blockquote']
	  },
	  {
		name: 'links',
		items: ['Link', 'Unlink']
	  },
	  {
		name: 'insert',
		items: ['Image', 'Table']
	  },
	  {
		name: 'video',
		// items: ['Html5video','Vimeo']
		 items: ['Vimeo']
	  },
	  {
		name: 'tools',
		items: ['Maximize']
	  },
	  {
		name: 'editing',
		items: ['Scayt','Sourcedialog']
	  }
	],
	config.filebrowserUploadUrl = '/uploader/upload';
	config.uploadUrl = '/uploader/upload';
	config.extraPlugins = 'image2,uploadimage,html5video,widget,widgetselection,clipboard,lineutils,sourcedialog,vimeo';
	config.allowedContent = true;
	config.font_names =  'Batang/Batang;Dotum/Dotum;Nanum Gothic/Nanum Gothic;'+config.font_names;
};
