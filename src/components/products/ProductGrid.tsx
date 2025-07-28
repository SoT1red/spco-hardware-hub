
import { useState } from "react";
import ProductCard, { Product } from "./ProductCard";
import { ArrowDownAZ, ArrowDownZA, ArrowUpDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface ProductGridProps {
  products: Product[];
  className?: string;
}

type SortOption = "name_asc" | "name_desc" | "recent";

const ProductGrid = ({ products, className }: ProductGridProps) => {
  const [sortOption, setSortOption] = useState<SortOption>("recent");

  const sortedProducts = [...products].sort((a, b) => {
    switch (sortOption) {
      case "name_asc":
        return a.name.localeCompare(b.name);
      case "name_desc":
        return b.name.localeCompare(a.name);
      case "recent":
      default:
        // Assuming that the most recent items have a higher id (if id is numeric)
        return b.id.localeCompare(a.id);
    }
  });

  return (
    <div className={className}>
      <div className="spco-flex-between" style={{ marginBottom: '1.5rem' }}>
        <div style={{ fontSize: '0.875rem', color: 'var(--gray-600)' }}>
          {products.length} products
        </div>

        <div className="spco-flex" style={{ alignItems: 'center', gap: '0.25rem' }}>
          <span style={{ fontSize: '0.875rem', color: 'var(--gray-600)', marginRight: '0.5rem' }}>Sort by:</span>
          <button
            className={cn(
              "spco-btn",
              sortOption === "recent"
                ? "spco-btn-secondary"
                : "spco-btn-outline"
            )}
            style={{ padding: '0.375rem 0.75rem', fontSize: '0.875rem' }}
            onClick={() => setSortOption("recent")}
          >
            <ArrowUpDown style={{ marginRight: '0.25rem', height: '14px', width: '14px' }} />
            Recent
          </button>
          <button
            className={cn(
              "spco-btn",
              sortOption === "name_asc"
                ? "spco-btn-secondary"
                : "spco-btn-outline"
            )}
            style={{ padding: '0.375rem 0.75rem', fontSize: '0.875rem' }}
            onClick={() => setSortOption("name_asc")}
          >
            <ArrowDownAZ style={{ marginRight: '0.25rem', height: '14px', width: '14px' }} />
            A-Z
          </button>
          <button
            className={cn(
              "spco-btn",
              sortOption === "name_desc"
                ? "spco-btn-secondary"
                : "spco-btn-outline"
            )}
            style={{ padding: '0.375rem 0.75rem', fontSize: '0.875rem' }}
            onClick={() => setSortOption("name_desc")}
          >
            <ArrowDownZA style={{ marginRight: '0.25rem', height: '14px', width: '14px' }} />
            Z-A
          </button>
        </div>
      </div>

      {sortedProducts.length > 0 ? (
        <div className="products-grid">
          {sortedProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="spco-card" style={{ textAlign: 'center', padding: '3rem', backgroundColor: 'var(--gray-50)' }}>
          <h3 style={{ fontSize: '1.125rem', fontWeight: '500', color: 'var(--tertiary-color)', marginBottom: '0.5rem' }}>
            No products found
          </h3>
          <p style={{ color: 'var(--gray-600)' }}>
            Try adjusting your filters or search criteria.
          </p>
        </div>
      )}
    </div>
  );
};

export default ProductGrid;
