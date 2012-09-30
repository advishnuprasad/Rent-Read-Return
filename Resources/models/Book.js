
function Book(titleId, title, isbn, description, imageURL, author, language, category) {
	this.id = titleId;
	this.title = title;
	this.isbn = isbn;
	this.description = description;
	this.imageURL = 'http://cdn2.justbooksclc.com/medium/'+imageURL+'.jpg';
	this.author = author;
	this.language = language;
	this.category = category;
}

module.exports = Book;
