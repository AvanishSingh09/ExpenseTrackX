package com.expense_tracker.repository;

import com.expense_tracker.model.Category;
import com.expense_tracker.model.Transaction;
import com.expense_tracker.model.TransactionType;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.time.LocalDate;
import java.util.List;

public interface TransactionRepository extends MongoRepository<Transaction, String> {
    List<Transaction> findByUserId(String userId);
    List<Transaction> findByUserIdAndType(String userId, TransactionType type);
    List<Transaction> findByUserIdAndCategory(String userId, Category category);
    List<Transaction> findByUserIdAndDate(String userId, LocalDate date);
}
