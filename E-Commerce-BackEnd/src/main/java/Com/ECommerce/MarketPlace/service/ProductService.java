package Com.ECommerce.MarketPlace.service;

import Com.ECommerce.MarketPlace.model.Product;
import Com.ECommerce.MarketPlace.repository.ProductRepository;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class ProductService {

    private final ProductRepository repo;

    public ProductService(ProductRepository repo) {
        this.repo = repo;
    }

    public List<Product> getProductsByCategory(String category) {
        return repo.findByCategory(category);
    }

    public List<Product> addProductsBulk(List<Product> products) {
        List<Product> savedProducts = new ArrayList<>();
        for (Product p : products) {
            boolean exists = repo.existsByNameAndCategory(p.getName(), p.getCategory());
            if (!exists) {
                savedProducts.add(repo.save(p));
            }
        }
        return savedProducts;
    }
}
