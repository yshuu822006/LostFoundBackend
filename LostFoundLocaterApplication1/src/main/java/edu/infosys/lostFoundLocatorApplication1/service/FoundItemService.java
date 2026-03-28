package edu.infosys.lostFoundLocatorApplication1.service;

import java.util.ArrayList;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.TreeSet;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import edu.infosys.lostFoundLocatorApplication1.bean.FoundItem;
import edu.infosys.lostFoundLocatorApplication1.bean.FoundItemDTO;
import edu.infosys.lostFoundLocatorApplication1.bean.LostItem;
import edu.infosys.lostFoundLocatorApplication1.dao.FoundItemDao;

@Service
public class FoundItemService{
	@Autowired
	private FoundItemDao dao;
	public String generateFoundItemId() {
		String newId="";
		String id=dao.getLastId();
		if(id==null) {
			newId="F100001";
		}else {
			int num=Integer.parseInt(id.substring(1))+1;
			newId="F"+num;
		}
		return newId;
	}


private List<FoundItem> keywordSearch(String keyword){
	return dao.searchByKeyword(keyword);
}
private List<FoundItem> soundexSearch(String keyword){
	return dao.fuzzySearchBySoundex(keyword);
}
private List<FoundItemDTO> smartSearch(String keyword){
	List<FoundItem> keywordResults=dao.searchByKeyword(keyword);
	List<FoundItem> soundexResults=dao.fuzzySearchBySoundex(keyword);
	Map<String,FoundItemDTO> merged=new LinkedHashMap<String,FoundItemDTO>();
	keywordResults.forEach(f -> merged.put(f.getFoundItemId(),new FoundItemDTO(f)));
	soundexResults.forEach(f -> merged.put(f.getFoundItemId(),new FoundItemDTO(f)));
	return new ArrayList<FoundItemDTO>(merged.values());
}
public List<FoundItemDTO> collectFoundItems(LostItem lostItem){
	TreeSet<FoundItemDTO> itemSet=new TreeSet<FoundItemDTO>();
	itemSet.addAll(smartSearch(lostItem.getLostItemName()));
	itemSet.addAll(smartSearch(lostItem.getCategory()));
	itemSet.addAll(smartSearch(lostItem.getColor()));
	return new ArrayList<FoundItemDTO>(itemSet);
}
}