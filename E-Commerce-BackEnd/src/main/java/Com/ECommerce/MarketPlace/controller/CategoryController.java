package Com.ECommerce.MarketPlace.controller;

import Com.ECommerce.MarketPlace.model.Product;
import Com.ECommerce.MarketPlace.service.ProductService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:3000") // Allow React frontend
public class CategoryController {

    private final ProductService service;

    public CategoryController(ProductService service) {
        this.service = service;
    }

    @GetMapping("/products/{category}")
    public List<Product> getProductsByCategory(@PathVariable String category) {
        return service.getProductsByCategory(category);
    }

    @PostMapping("/products/bulk/{category}")
    public List<Product> addProductsBulk(
            @PathVariable String category,
            @RequestBody List<Product> products
    ) {
        // Force all products to the specified category
        products.forEach(p -> p.setCategory(category));
        return service.addProductsBulk(products);
    }
}