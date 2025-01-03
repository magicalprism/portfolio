document.addEventListener("DOMContentLoaded", async () => {
  const contentData = await fetchContent();
  await preloadContent(contentData);

  restoreFiltersFromStorage();
  updateDynamicVisibility();
  attachEventListeners();
});
