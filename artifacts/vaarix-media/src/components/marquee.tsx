const brands = ["Velvet Cloud", "Parotta Palace", "Bharat Bhavan", "MNM Lounge", "Deccan Grill", "Eesha Blogs"];
export function Marquee() {
  return <section aria-label="Featured brands" className="border-y border-border bg-white py-6">
    <div className="container mx-auto grid grid-cols-2 items-center gap-x-5 gap-y-5 px-5 text-center text-sm font-medium text-muted-foreground sm:grid-cols-3 lg:grid-cols-6 md:px-12">{brands.map(brand => <span key={brand}>{brand}</span>)}</div>
  </section>;
}
