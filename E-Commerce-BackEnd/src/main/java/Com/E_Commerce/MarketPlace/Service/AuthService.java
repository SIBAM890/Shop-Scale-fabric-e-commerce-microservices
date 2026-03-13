package Com.E_Commerce.MarketPlace.Service;

import Com.E_Commerce.MarketPlace.Model.User;
import Com.E_Commerce.MarketPlace.Repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class AuthService {

    @Autowired
    UserRepository repo;

    public User signin(User user){

        return repo.save(user);
    }

    public User login(String email, String password){

        User user = repo.findByEmail(email).orElse(null);

        if(user!=null && user.getPassword().equals(password)){
            return user;
        }

        return null;
    }
}
