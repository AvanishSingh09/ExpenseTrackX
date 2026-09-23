package com.expense_tracker.service;

import com.expense_tracker.exception.ResourceNotFoundException;
import com.expense_tracker.model.Category;
import com.expense_tracker.model.Transaction;
import com.expense_tracker.model.TransactionType;
import com.expense_tracker.repository.TransactionRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
@RequiredArgsConstructor
public class TransactionService {

    private final TransactionRepository transactionRepository;

    public Transaction createTransaction(Transaction transaction) {
        if (transaction.getDate() == null) {
            transaction.setDate(LocalDate.now());
        }
        return transactionRepository.save(transaction);
    }

    public List<Transaction> getTransactionsByUserId(String userId, String type, String category, String date) {
        if (type != null) {
            return transactionRepository.findByUserIdAndType(userId, TransactionType.valueOf(type.toUpperCase()));
        }
        if (category != null) {
            return transactionRepository.findByUserIdAndCategory(userId, Category.valueOf(category.toUpperCase()));
        }
        if (date != null) {
            return transactionRepository.findByUserIdAndDate(userId, LocalDate.parse(date));
        }
        return transactionRepository.findByUserId(userId);
    }

    public Transaction getTransactionById(String id, String userId) {
        Transaction transaction = transactionRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Transaction not found"));
        
        if (!transaction.getUserId().equals(userId)) {
            throw new ResourceNotFoundException("Transaction not found");
        }
        return transaction;
    }

    public Transaction updateTransaction(String id, Transaction updatedTransaction, String userId) {
        Transaction existing = getTransactionById(id, userId);
        
        existing.setTitle(updatedTransaction.getTitle());
        existing.setAmount(updatedTransaction.getAmount());
        existing.setType(updatedTransaction.getType());
        existing.setCategory(updatedTransaction.getCategory());
        existing.setDescription(updatedTransaction.getDescription());
        if (updatedTransaction.getDate() != null) {
            existing.setDate(updatedTransaction.getDate());
        }

        return transactionRepository.save(existing);
    }

    public void deleteTransaction(String id, String userId) {
        Transaction transaction = getTransactionById(id, userId);
        transactionRepository.delete(transaction);
    }
}
