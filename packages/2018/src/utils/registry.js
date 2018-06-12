export default class Registry {
  constructor(entries) {
    this.entries = entries;
    this.validateEntries();
  }

  // Ensure that there are no duplicate entries in the registry
  validateEntries() {
    const duplicates = [];
    const slugs = new Set();

    // Track every slug that is in entries more than once
    this.entries.forEach((entry) => {
      if (slugs.has(entry.slug)) {
        duplicates.push(entry.slug);
      }
      slugs.add(entry.slug);
    });

    // Throw errors for every duplicate
    duplicates.forEach((duplicate) => {
      const labels = this.entries
        .filter(entry => entry.slug === duplicate)
        .map(entry => `${entry.slug}\n\t(${entry.component.displayName}) in ${entry.project}`);

      throw new Error(
        `Duplicate slugs found. All card slugs must be unique\n\n${labels.join('\n')}\n`
      );
    });
  }

  // Add a new entry to the registry and validate the set
  add(entry) {
    this.entries.push(entry);
    this.validateEntries();
  }

  // Remove an entry (to have symmetry with Add)
  remove(entryOrSlug) {
    const toRemove = typeof entryOrSlug === 'string'
      ? this.entries.find(entry => entry.slug === entryOrSlug)
      : this.entries.find(entry => entry === entryOrSlug);

    if (toRemove) {
      this.entries.splice(this.entries.indexOf(toRemove), 1);
    }
  }

  // Get an entry by slug
  find(slug) {
    return this.entries.find(entry => entry.slug === slug);
  }
}
