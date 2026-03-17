package Com.E_Commerce.MarketPlace.Service;

import Com.E_Commerce.MarketPlace.Model.Offer;
import Com.E_Commerce.MarketPlace.Repository.OfferRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class OfferService {

    @Autowired
    private OfferRepository repository;

    public Offer createOffer(Offer offer){
        return repository.save(offer);
    }

    public List<Offer> getAllOffers(){
        return repository.findAll();
    }

    public Offer getById(Long id){
        return repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Offer not found"));
    }
}