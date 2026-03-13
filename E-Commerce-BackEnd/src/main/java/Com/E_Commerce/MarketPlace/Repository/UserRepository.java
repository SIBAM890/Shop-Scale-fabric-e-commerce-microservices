package Com.E_Commerce.MarketPlace.Repository;

import java.util.Optional;

import Com.E_Commerce.MarketPlace.Model.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User,Long>{
    Optional<User> findByEmail(String email);
}
