package Com.E_Commerce.MarketPlace.Repository;

import Com.E_Commerce.MarketPlace.Model.Offer;
import org.springframework.data.jpa.repository.JpaRepository;

public interface OfferRepository extends JpaRepository<Offer, Long> {
}