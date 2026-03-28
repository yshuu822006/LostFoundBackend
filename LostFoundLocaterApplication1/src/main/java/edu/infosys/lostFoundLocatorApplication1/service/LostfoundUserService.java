package edu.infosys.lostFoundLocatorApplication1.service;
import edu.infosys.lostFoundLocatorApplication1.bean.LostfoundUser;
import edu.infosys.lostFoundLocatorApplication1.dao.LostfoundUserRepository;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class LostfoundUserService implements UserDetailsService {
	@Autowired
	private LostfoundUserRepository repository;
	
	private String userId;
	private String role;
	private LostfoundUser user;
	// save a new user in to database
		public void saveUser(LostfoundUser user1) {
			repository.save(user1);
		}
		// validate an existing user from database
		@Override
		public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
			this.user=repository.findById(username).get();
			this.userId=user.getUsername();
			this.role=user.getRole();
			return this.user;
		}
		public List<LostfoundUser> getAllStudents(){
			return repository.getAllStudents();
		}
	 
	    public String getUserId() {
			return userId;
		}
	 
		public String getRole() {
			return role;
		}
	 
		public LostfoundUser getUser() {
			return user;
		}
		public void deleteUser(String id) {
			repository.deleteById(id);
		}
	 
}
