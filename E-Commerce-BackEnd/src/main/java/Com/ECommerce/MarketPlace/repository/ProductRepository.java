package Com.ECommerce.MarketPlace.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import Com.ECommerce.MarketPlace.model.Product;
import java.util.List;

public interface ProductRepository extends JpaRepository<Product, Long> {
    List<Product> findByCategory(String category);
    boolean existsByNameAndCategory(String name, String category);
}
