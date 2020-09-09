
<script>
  const fileSelector = document.getElementById('file-selector');
  fileSelector.addEventListener('click', (event) => {
    const fileList = event.target.files;
    console.log(fileList);
  });
</script>