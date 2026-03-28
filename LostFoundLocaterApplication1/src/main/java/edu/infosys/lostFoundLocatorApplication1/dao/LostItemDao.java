package edu.infosys.lostFoundLocatorApplication1.dao;

import java.util.List;
import edu.infosys.lostFoundLocatorApplication1.bean.LostItem;
public interface LostItemDao {
	public void saveLostItem(LostItem lostItem);
	public List<LostItem> getAllLostItems();
	public LostItem getLostItemById(String lostItemId);
	public void deleteLostItemById(String lostItemId);
	public String getLastId();
	public List<LostItem> getLostItemsByUsername(String username);
}
