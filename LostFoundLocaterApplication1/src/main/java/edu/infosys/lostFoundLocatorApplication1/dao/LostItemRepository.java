package edu.infosys.lostFoundLocatorApplication1.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import edu.infosys.lostFoundLocatorApplication1.bean.LostItem;

public interface LostItemRepository extends JpaRepository<LostItem, String> {

    @Query("SELECT MAX(l.lostItemId) FROM LostItem l")
    String getLastId();

    @Query("SELECT l FROM LostItem l WHERE l.status=false AND l.username=?1")
    List<LostItem> getLostItemsByUsername(String username);
}
