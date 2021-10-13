import React from 'react'
import ReactDOM from "react-dom";
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { Modal, Button } from 'react-bootstrap'

import { closeAllModals } from './actions'
import { insertMacrosIntoObject } from '../template/actions'

class MacrosModal extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      filter: ""
    }
  }

  insertMacros = (macrosItem) => {
    this.props.insertMacrosIntoObject(this.props.activeObjectId, `{{${macrosItem}}}`)
    this.props.closeAllModals()
  }

  handleChangeFilter = (e) => {
    this.setState({
      filter: e.target.value
    })
  }

  handleClearFilter = () => {
    this.setState({
      filter: ""
    })
  }

  render() {
    const filter = this.state.filter.toLowerCase()
    var macrosList = []

    for (let [key, value] of Object.entries(macros)) {
      if (macros[key]["friendlyWriting"].toLowerCase().includes(filter) || macros[key]["description"].toLowerCase().includes(filter)) {
        macrosList.push(
          <tr
            className="macros-list-item"
            key={key}
            onClick={e => this.insertMacros(macros[key]["friendlyWriting"])}>
            <td>{macros[key]["friendlyWriting"]}</td>
            <td>{macros[key]["description"]}</td>
          </tr>
        )
      }
    }

    return (
      <Modal show={this.props.macrosModalOpened} onHide={this.props.closeAllModals} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Insert macros<br/>(select and double-click on a macro)</Modal.Title>
          <div className="input-group mL-20 col-lg-6">            
            <input type="text" className="form-control" placeholder="type here to search" value={this.state.filter} onChange={this.handleChangeFilter} />
            <div className="input-group-prepend">
              <button className="btn btn-outline-secondary" onClick={this.handleClearFilter}>clear</button>
            </div>

          </div>
        </Modal.Header>
        <Modal.Body>
          <table className="table">
            <tbody>
              {macrosList}
            </tbody>
          </table>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={this.props.closeAllModals}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

function mapStateToProps(state) {
  return {
    macrosModalOpened: state.modals.macrosModalOpened,
    template: state.template,
    activeObjectId: state.pdfViewer.activeObjectId
  }
}

function mapDispatchToProps(dispatch){
  return bindActionCreators({
    closeAllModals,
    insertMacrosIntoObject
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(MacrosModal)


const macros = {
  "SMARTDATE": {

    "friendlyWriting": "SmartDate",
    "description": "Tries to detect the date in the most common formats."
  },
  "NUMBER": {

    "friendlyWriting": "Number",
    "description": "Tries to detect the decimal number like the following: \"12.34\", \"-123,456.78\", \"123.456\". Decimal separator and thousands separator are automatically taken from the template culture."
  },
  "MONEY": {

    "friendlyWriting": "Money",
    "description": "Tries to detect the decimal number with currency symbol like the following: \"USD 12.34\", \"$123,456.78\", \"123.45 €\". Decimal separator and thousands separator are automatically taken from the template culture."
  },
  "USPHONENUMBER": {

    "friendlyWriting": "USPhoneNumber",
    "description": "Tries to detect US phone number."
  },
  "SPACE": {

    "friendlyWriting": "Space",
    "description": "Single space."
  },
  "SPACES": {

    "friendlyWriting": "Spaces",
    "description": "One or more spaces."
  },
  "2SPACES": {

    "friendlyWriting": "2Spaces",
    "description": "Two spaces."
  },
  "3SPACES": {

    "friendlyWriting": "3Spaces",
    "description": "Three spaces."
  },
  "4SPACES": {

    "friendlyWriting": "4Spaces",
    "description": "Four spaces."
  },
  "5SPACES": {

    "friendlyWriting": "5Spaces",
    "description": "Five spaces."
  },
  "6SPACES": {

    "friendlyWriting": "6Spaces",
    "description": "Six spaces."
  },
  "7SPACES": {

    "friendlyWriting": "7Spaces",
    "description": "Seven spaces."
  },
  "8SPACES": {

    "friendlyWriting": "8Spaces",
    "description": "Eight spaces."
  },
  "9SPACES": {

    "friendlyWriting": "9Spaces",
    "description": "Nine spaces."
  },
  "10SPACES": {

    "friendlyWriting": "10Spaces",
    "description": "Ten spaces."
  },
  "DIGIT": {

    "friendlyWriting": "Digit",
    "description": "One digit."
  },
  "DIGITS": {

    "friendlyWriting": "Digits",
    "description": "One or more digits."
  },
  "2DIGITS": {

    "friendlyWriting": "2Digits",
    "description": "Two digits."
  },
  "3DIGITS": {

    "friendlyWriting": "3Digits",
    "description": "Three digits."
  },
  "4DIGITS": {

    "friendlyWriting": "4Digits",
    "description": "Four digits."
  },
  "5DIGITS": {

    "friendlyWriting": "5Digits",
    "description": "Five digits."
  },
  "6DIGITS": {

    "friendlyWriting": "6Digits",
    "description": "Six digits."
  },
  "7DIGITS": {

    "friendlyWriting": "7Digits",
    "description": "Seven digits."
  },
  "8DIGITS": {

    "friendlyWriting": "8Digits",
    "description": "Eight digits."
  },
  "9DIGITS": {

    "friendlyWriting": "9Digits",
    "description": "Nine digits."
  },
  "10DIGITS": {

    "friendlyWriting": "10Digits",
    "description": "Ten digits."
  },
  "DIGITORSYMBOL": {

    "friendlyWriting": "DigitOrSymbol",
    "description": "One digit or symbol (\"_-+=/\")."
  },
  "DIGITSORSYMBOLS": {

    "friendlyWriting": "DigitsOrSymbols",
    "description": "One or more digits or symbols (\"_-+=/\")."
  },
  "2DIGITSORSYMBOLS": {

    "friendlyWriting": "2DigitsOrSymbols",
    "description": "Two digits or symbols (\"_-+=/\")."
  },
  "3DIGITSORSYMBOLS": {

    "friendlyWriting": "3DigitsOrSymbols",
    "description": "Three digits or symbols (\"_-+=/\")."
  },
  "4DIGITSORSYMBOLS": {

    "friendlyWriting": "4DigitsOrSymbols",
    "description": "Four digits or symbols (\"_-+=/\")."
  },
  "5DIGITSORSYMBOLS": {

    "friendlyWriting": "5DigitsOrSymbols",
    "description": "Five digits or symbols (\"_-+=/\")."
  },
  "6DIGITSORSYMBOLS": {

    "friendlyWriting": "6DigitsOrSymbols",
    "description": "Six digits or symbols (\"_-+=/\")."
  },
  "7DIGITSORSYMBOLS": {

    "friendlyWriting": "7DigitsOrSymbols",
    "description": "Seven digits or symbols (\"_-+=/\")."
  },
  "8DIGITSORSYMBOLS": {

    "friendlyWriting": "8DigitsOrSymbols",
    "description": "Eight digits or symbols (\"_-+=/\")."
  },
  "9DIGITSORSYMBOLS": {

    "friendlyWriting": "9DigitsOrSymbols",
    "description": "Nine digits or symbols (\"_-+=/\")."
  },
  "10DIGITSORSYMBOLS": {

    "friendlyWriting": "10DigitsOrSymbols",
    "description": "Ten digits or symbols (\"_-+=/\")."
  },
  "LETTER": {

    "friendlyWriting": "Letter",
    "description": "One letter from any language."
  },
  "LETTERS": {

    "friendlyWriting": "Letters",
    "description": "One or more letters from any language."
  },
  "2LETTERS": {

    "friendlyWriting": "2Letters",
    "description": "Two letters from any language."
  },
  "3LETTERS": {

    "friendlyWriting": "3Letters",
    "description": "Three letters from any language."
  },
  "4LETTERS": {

    "friendlyWriting": "4Letters",
    "description": "Four letters from any language."
  },
  "5LETTERS": {

    "friendlyWriting": "5Letters",
    "description": "Five letters from any language."
  },
  "6LETTERS": {

    "friendlyWriting": "6Letters",
    "description": "Six letters from any language."
  },
  "7LETTERS": {

    "friendlyWriting": "7Letters",
    "description": "Seven letters from any language."
  },
  "8LETTERS": {

    "friendlyWriting": "8Letters",
    "description": "Eight letters from any language."
  },
  "9LETTERS": {

    "friendlyWriting": "9Letters",
    "description": "Nine letters from any language."
  },
  "10LETTERS": {

    "friendlyWriting": "10Letters",
    "description": "Ten letters from any language."
  },
  "UPPERCASELETTER": {

    "friendlyWriting": "UppercaseLetter",
    "description": "One uppercase letter from any language."
  },
  "UPPERCASELETTERS": {

    "friendlyWriting": "UppercaseLetters",
    "description": "One or more uppercase letters from any language."
  },
  "2UPPERCASELETTERS": {

    "friendlyWriting": "2UppercaseLetter",
    "description": "Two uppercase letters from any language."
  },
  "3UPPERCASELETTERS": {

    "friendlyWriting": "3UppercaseLetter",
    "description": "Three uppercase letters from any language."
  },
  "4UPPERCASELETTERS": {

    "friendlyWriting": "4UppercaseLetter",
    "description": "Four uppercase letters from any language."
  },
  "5UPPERCASELETTERS": {

    "friendlyWriting": "5UppercaseLetter",
    "description": "Five uppercase letters from any language."
  },
  "6UPPERCASELETTERS": {

    "friendlyWriting": "6UppercaseLetter",
    "description": "Six uppercase letters from any language."
  },
  "7UPPERCASELETTERS": {

    "friendlyWriting": "7UppercaseLetter",
    "description": "Seven uppercase letters from any language."
  },
  "8UPPERCASELETTERS": {

    "friendlyWriting": "8UppercaseLetter",
    "description": "Eight uppercase letters from any language."
  },
  "9UPPERCASELETTERS": {

    "friendlyWriting": "9UppercaseLetter",
    "description": "Nine uppercase letters from any language."
  },
  "10UPPERCASELETTERS": {

    "friendlyWriting": "10UppercaseLetter",
    "description": "Ten uppercase letters from any language."
  },
  "LETTERORDIGIT": {

    "friendlyWriting": "LetterOrDigit",
    "description": "One letter or digit."
  },
  "LETTERSORDIGITS": {

    "friendlyWriting": "LettersOrDigits",
    "description": "One or more letters or digits."
  },
  "2LETTERSORDIGITS": {

    "friendlyWriting": "2LettersOrDigits",
    "description": "Two letters or digits."
  },
  "3LETTERSORDIGITS": {

    "friendlyWriting": "3LettersOrDigits",
    "description": "Three letters or digits."
  },
  "4LETTERSORDIGITS": {

    "friendlyWriting": "4LettersOrDigits",
    "description": "Four letters or digits."
  },
  "5LETTERSORDIGITS": {

    "friendlyWriting": "5LettersOrDigits",
    "description": "Five letters or digits."
  },
  "6LETTERSORDIGITS": {

    "friendlyWriting": "6LettersOrDigits",
    "description": "Six letters or digits."
  },
  "7LETTERSORDIGITS": {

    "friendlyWriting": "7LettersOrDigits",
    "description": "Seven letters or digits."
  },
  "8LETTERSORDIGITS": {

    "friendlyWriting": "8LettersOrDigits",
    "description": "Eight letters or digits."
  },
  "9LETTERSORDIGITS": {

    "friendlyWriting": "9LettersOrDigits",
    "description": "Nine letters or digits."
  },
  "10LETTERSORDIGITS": {

    "friendlyWriting": "10LettersOrDigits",
    "description": "Ten letters or digits."
  },
  "UPPERCASELETTERORDIGIT": {

    "friendlyWriting": "UppercaseLetterOrDigit",
    "description": "One uppercase letter or digit."
  },
  "UPPERCASELETTERSORDIGITS": {

    "friendlyWriting": "UppercaseLettersOrDigits",
    "description": "One or more uppercase letters or digits."
  },
  "2UPPERCASELETTERSORDIGITS": {

    "friendlyWriting": "2UppercaseLettersOrDigits",
    "description": "Two uppercase letters or digits."
  },
  "3UPPERCASELETTERSORDIGITS": {

    "friendlyWriting": "3UppercaseLettersOrDigits",
    "description": "Three uppercase letters or digits."
  },
  "4UPPERCASELETTERSORDIGITS": {

    "friendlyWriting": "4UppercaseLettersOrDigits",
    "description": "Four uppercase letters or digits."
  },
  "5UPPERCASELETTERSORDIGITS": {

    "friendlyWriting": "5UppercaseLettersOrDigits",
    "description": "Five uppercase letters or digits."
  },
  "6UPPERCASELETTERSORDIGITS": {

    "friendlyWriting": "6UppercaseLettersOrDigits",
    "description": "Six uppercase letters or digits."
  },
  "7UPPERCASELETTERSORDIGITS": {

    "friendlyWriting": "7UppercaseLettersOrDigits",
    "description": "Seven uppercase letters or digits."
  },
  "8UPPERCASELETTERSORDIGITS": {

    "friendlyWriting": "8UppercaseLettersOrDigits",
    "description": "Eight uppercase letters or digits."
  },
  "9UPPERCASELETTERSORDIGITS": {

    "friendlyWriting": "9UppercaseLettersOrDigits",
    "description": "Nine uppercase letters or digits."
  },
  "10UPPERCASELETTERSORDIGITS": {

    "friendlyWriting": "10UppercaseLettersOrDigits",
    "description": "Ten uppercase letters or digits."
  },
  "LETTERORDIGITORSYMBOL": {

    "friendlyWriting": "LetterOrDigitOrSymbol",
    "description": "One letter, or digit, or symbol (\"_-+=/\")."
  },
  "LETTERSORDIGITSORSYMBOLS": {

    "friendlyWriting": "LettersOrDigitsOrSymbols",
    "description": "One or more letters, or digits, or symbols (\"_-+=/\")."
  },
  "2LETTERSORDIGITSORSYMBOLS": {

    "friendlyWriting": "2LettersOrDigitsOrSymbols",
    "description": "Two letters, or digits, or symbols (\"_-+=/\")."
  },
  "3LETTERSORDIGITSORSYMBOLS": {

    "friendlyWriting": "3LettersOrDigitsOrSymbols",
    "description": "Three letters, or digits, or symbols (\"_-+=/\")."
  },
  "4LETTERSORDIGITSORSYMBOLS": {

    "friendlyWriting": "4LettersOrDigitsOrSymbols",
    "description": "Four letters, or digits, or symbols (\"_-+=/\")."
  },
  "5LETTERSORDIGITSORSYMBOLS": {

    "friendlyWriting": "5LettersOrDigitsOrSymbols",
    "description": "Five letters, or digits, or symbols (\"_-+=/\")."
  },
  "6LETTERSORDIGITSORSYMBOLS": {

    "friendlyWriting": "6LettersOrDigitsOrSymbols",
    "description": "Six letters, or digits, or symbols (\"_-+=/\")."
  },
  "7LETTERSORDIGITSORSYMBOLS": {

    "friendlyWriting": "7LettersOrDigitsOrSymbols",
    "description": "Seven letters, or digits, or symbols (\"_-+=/\")."
  },
  "8LETTERSORDIGITSORSYMBOLS": {

    "friendlyWriting": "8LettersOrDigitsOrSymbols",
    "description": "Eight letters, or digits, or symbols (\"_-+=/\")."
  },
  "9LETTERSORDIGITSORSYMBOLS": {

    "friendlyWriting": "9LettersOrDigitsOrSymbols",
    "description": "Nine letters, or digits, or symbols (\"_-+=/\")."
  },
  "10LETTERSORDIGITSORSYMBOLS": {

    "friendlyWriting": "10LettersOrDigitsOrSymbols",
    "description": "Ten letters, or digits, or symbols (\"_-+=/\")."
  },
  "UPPERCASELETTERORDIGITORSYMBOL": {

    "friendlyWriting": "UppercaseLetterOrDigitOrSymbol",
    "description": "One uppercase letter, or digit, or symbol (\"_-+=/\")."
  },
  "UPPERCASELETTERSORDIGITSORSYMBOLS": {

    "friendlyWriting": "UppercaseLettersOrDigitsOrSymbols",
    "description": "One or more uppercase letters, or digits, or symbols (\"_-+=/\")."
  },
  "2UPPERCASELETTERSORDIGITSORSYMBOLS": {

    "friendlyWriting": "2UppercaseLettersOrDigitsOrSymbols",
    "description": "Two uppercase letters, or digits, or symbols (\"_-+=/\")."
  },
  "3UPPERCASELETTERSORDIGITSORSYMBOLS": {

    "friendlyWriting": "3UppercaseLettersOrDigitsOrSymbols",
    "description": "Three uppercase letters, or digits, or symbols (\"_-+=/\")."
  },
  "4UPPERCASELETTERSORDIGITSORSYMBOLS": {

    "friendlyWriting": "4UppercaseLettersOrDigitsOrSymbols",
    "description": "Four uppercase letters, or digits, or symbols (\"_-+=/\")."
  },
  "5UPPERCASELETTERSORDIGITSORSYMBOLS": {

    "friendlyWriting": "5UppercaseLettersOrDigitsOrSymbols",
    "description": "Five uppercase letters, or digits, or symbols (\"_-+=/\")."
  },
  "6UPPERCASELETTERSORDIGITSORSYMBOLS": {

    "friendlyWriting": "6UppercaseLettersOrDigitsOrSymbols",
    "description": "Six uppercase letters, or digits, or symbols (\"_-+=/\")."
  },
  "7UPPERCASELETTERSORDIGITSORSYMBOLS": {

    "friendlyWriting": "7UppercaseLettersOrDigitsOrSymbols",
    "description": "Seven uppercase letters, or digits, or symbols (\"_-+=/\")."
  },
  "8UPPERCASELETTERSORDIGITSORSYMBOLS": {

    "friendlyWriting": "8UppercaseLettersOrDigitsOrSymbols",
    "description": "Eight uppercase letters, or digits, or symbols (\"_-+=/\")."
  },
  "9UPPERCASELETTERSORDIGITSORSYMBOLS": {

    "friendlyWriting": "9UppercaseLettersOrDigitsOrSymbols",
    "description": "Nine uppercase letters, or digits, or symbols (\"_-+=/\")."
  },
  "10UPPERCASELETTERSORDIGITSORSYMBOLS": {

    "friendlyWriting": "10UppercaseLettersOrDigitsOrSymbols",
    "description": "Ten uppercase letters, or digits, or symbols (\"_-+=/\")."
  },
  "DOLLAR": {

    "friendlyWriting": "Dollar",
    "description": "Dollar sign ($)."
  },
  "EURO": {

    "friendlyWriting": "Euro",
    "description": "Euro sign (€)."
  },
  "POUND": {

    "friendlyWriting": "Pound",
    "description": "Pound sign (£)."
  },
  "YEN": {

    "friendlyWriting": "Yen",
    "description": "Yen sign (¥)."
  },
  "YUAN": {

    "friendlyWriting": "Yuan",
    "description": "Yuan sign (¥)."
  },
  "CURRENCYSYMBOL": {

    "friendlyWriting": "CurrencySymbol",
    "description": "Any currency symbol ($, €, £, ¥, etc.)"
  },
  "DOT": {

    "friendlyWriting": "Dot",
    "description": "Single dot symbol (\".\")."
  },
  "COMMA": {

    "friendlyWriting": "Comma",
    "description": "Single comma symbol (\",\")."
  },
  "COLON": {

    "friendlyWriting": "Colon",
    "description": "Single colon symbol (\":\")."
  },
  "SEMICOLON": {

    "friendlyWriting": "Semicolon",
    "description": "Single semicolon symbol (\";\")."
  },
  "MINUS": {

    "friendlyWriting": "Minus",
    "description": "Single minus (dash, hyphen) symbol (\"-\")."
  },
  "SLASH": {

    "friendlyWriting": "Slash",
    "description": "Slash symbol (\"/\")."
  },
  "BACKSLASH": {

    "friendlyWriting": "Backslash",
    "description": "Backslash symbol (\"\\\")."
  },
  "PERCENT": {

    "friendlyWriting": "Percent",
    "description": "Percent symbol (\"%\")."
  },
  "LINESTART": {

    "friendlyWriting": "LineStart",
    "description": "Start of line (virtual symbol)."
  },
  "LINEEND": {

    "friendlyWriting": "LineEnd",
    "description": "End of line (virtual symbol)."
  },
  "SENTENCEWITHSINGLESPACES": {

    "friendlyWriting": "SentenceWithSingleSpaces",
    "description": "Single-space-separated sequence of words and symbols. Breaks on double space."
  },
  "SENTENCEWITHDOUBLESPACES": {

    "friendlyWriting": "SentenceWithDoubleSpaces",
    "description": "Extended {{SentenceWithSingleSpaces}} macro allowing two spaces between words. Breaks on triple space."
  },
  "ENDOFPAGE": {

    "friendlyWriting": "EndOfPage",
    "description": "End of page or end of document."
  },
  "WORDBOUNDARY": {

    "friendlyWriting": "WordBoundary",
    "description": "Start or end of word  (virtual symbol)."
  },
  "OPENINGCURLYBRACE": {

    "friendlyWriting": "OpeningCurlyBrace",
    "description": "Opening curly brace symbol (\"{\")."
  },
  "CLOSINGCURLYBRACE": {

    "friendlyWriting": "ClosingCurlyBrace",
    "description": "Closing curly brace symbol (\"}\")."
  },
  "OPENINGPARENTHESIS": {

    "friendlyWriting": "OpeningParenthesis",
    "description": "Opening parenthesis symbol (\"(\")."
  },
  "CLOSINGPARENTHESIS": {

    "friendlyWriting": "ClosingParenthesis",
    "description": "Closing parenthesis symbol (\")\")."
  },
  "OPENINGSQUAREBRACKET": {

    "friendlyWriting": "OpeningSquareBracket",
    "description": "Opening square bracket symbol (\"[\")."
  },
  "CLOSINGSQUAREBRACKET": {

    "friendlyWriting": "ClosingSquareBracket",
    "description": "Closing square bracket symbol (\"]\")."
  },
  "OPENINGANGLEBRACKET": {

    "friendlyWriting": "OpeningAngleBracket",
    "description": "Opening angle bracket symbol (\"<\")."
  },
  "CLOSINGANGLEBRACKET": {

    "friendlyWriting": "ClosingAngleBracket",
    "description": "Closing angle bracket symbol (\">\")."
  },
  "DATEMM/DD/YY": {

    "friendlyWriting": "DateMM/DD/YY",
    "description": "Date in format \"01/01/19\" (with leading zero)."
  },
  "DATEM/D/YY": {

    "friendlyWriting": "DateM/D/YY",
    "description": "Date in format \"1/1/19\" (without leading zero)."
  },
  "DATEMM/DD/YYYY": {

    "friendlyWriting": "DateMM/DD/YYYY",
    "description": "Date in format \"01/01/2019\" (with leading zero)."
  },
  "DATEM/D/YYYY": {

    "friendlyWriting": "DateM/D/YYYY",
    "description": "Date in format \"1/1/2019\" (without leading zero)."
  },
  "DATEMM-DD-YY": {

    "friendlyWriting": "DateMM-DD-YY",
    "description": "Date in format \"01-01-19\" (with leading zero)."
  },
  "DATEM-D-YY": {

    "friendlyWriting": "DateM-D-YY",
    "description": "Date in format \"1-1-19\" (without leading zero)."
  },
  "DATEMM-DD-YYYY": {

    "friendlyWriting": "DateMM-DD-YYYY",
    "description": "Date in format \"01-01-2019\" (with leading zero)."
  },
  "DATEM-D-YYYY": {

    "friendlyWriting": "DateM-D-YYYY",
    "description": "Date in format \"1-1-2019\" (without leading zero)."
  },
  "DATEMM.DD.YY": {

    "friendlyWriting": "DateMM.DD.YY",
    "description": "Date in format \"01.01.19\" (with leading zero)."
  },
  "DATEM.D.YY": {

    "friendlyWriting": "DateM.D.YY",
    "description": "Date in format \"1.1.19\" (without leading zero)."
  },
  "DATEMM.DD.YYYY": {

    "friendlyWriting": "DateMM.DD.YYYY",
    "description": "Date in format \"01.01.2019\" (with leading zero)."
  },
  "DATEM.D.YYYY": {

    "friendlyWriting": "DateM.D.YYYY",
    "description": "Date in format \"01.01.2019\" (without leading zero)."
  },
  "DATEDD/MM/YY": {

    "friendlyWriting": "DateDD/MM/YY",
    "description": "Date in format \"01/01/19\" (with leading zero)."
  },
  "DATED/M/YY": {

    "friendlyWriting": "DateD/M/YY",
    "description": "Date in format \"1/1/19\" (without leading zero)."
  },
  "DATEDD/MM/YYYY": {

    "friendlyWriting": "DateDD/MM/YYYY",
    "description": "Date in format \"01/01/2019\" (with leading zero)."
  },
  "DATED/M/YYYY": {

    "friendlyWriting": "DateD/M/YYYY",
    "description": "Date in format \"1/1/2019\" (without leading zero)."
  },
  "DATEDD-MM-YY": {

    "friendlyWriting": "DateDD-MM-YY",
    "description": "Date in format \"01-01-19\" (with leading zero)."
  },
  "DATED-M-YY": {

    "friendlyWriting": "DateD-M-YY",
    "description": "Date in format \"1-1-19\" (without leading zero)."
  },
  "DATEDD-MM-YYYY": {

    "friendlyWriting": "DateDD-MM-YYYY",
    "description": "Date in format \"01-01-2019\" (with leading zero)."
  },
  "DATED-M-YYYY": {

    "friendlyWriting": "DateD-M-YYYY",
    "description": "Date in format \"1-1-2019\" (without leading zero)."
  },
  "DATEDD.MM.YY": {

    "friendlyWriting": "DateDD.MM.YY",
    "description": "Date in format \"01.01.19\" (with leading zero)."
  },
  "DATED.M.YY": {

    "friendlyWriting": "DateD.M.YY",
    "description": "Date in format \"1.1.19\" (without leading zero)."
  },
  "DATEDD.MM.YYYY": {

    "friendlyWriting": "DateDD.MM.YYYY",
    "description": "Date in format \"01.01.2019\" (with leading zero)."
  },
  "DATED.M.YYYY": {

    "friendlyWriting": "DateD.M.YYYY",
    "description": "Date in format \"1.1.2019\" (without leading zero)."
  },
  "DATEYYYYMMDD": {

    "friendlyWriting": "DateYYYYMMDD",
    "description": "Date in format \"20190101\"."
  },
  "DATEYYYY/MM/DD": {

    "friendlyWriting": "DateYYYY/MM/DD",
    "description": "Date in format \"2019/01/01\" (with leading zero)."
  },
  "DATEYYYY/M/D": {

    "friendlyWriting": "DateYYYY/M/D",
    "description": "Date in format \"2019/1/1\" (without leading zero)."
  },
  "DATEYYYY-MM-DD": {

    "friendlyWriting": "DateYYYY-MM-DD",
    "description": "Date in format \"2019-01-01\" (with leading zero)."
  },
  "DATEYYYY-M-D": {

    "friendlyWriting": "DateYYYY-M-D",
    "description": "Date in format \"2019-1-1\" (without leading zero)."
  },
  "ANYSYMBOL": {

    "friendlyWriting": "AnySymbol",
    "description": "Starting position of the document."
  },
  "WORDBOUND": {

    "friendlyWriting": "WordBound",
    "description": "Left or right word bound."
  },
  "ANYTHING": {

    "friendlyWriting": "Anything",
    "description": "Any characters up to the next macro in the expression."
  },
  "ANYTHINGGREEDY": {

    "friendlyWriting": "AnythingGreedy",
    "description": "Any characters up to the next macro in the expression or to the end of line. Greedy version."
  },
  "TOGGLESINGLELINEMODE": {

    "friendlyWriting": "ToggleSingleLineMode",
    "description": "Enables or disables single-line mode. In single-line mode, {{Anything}} and {{AnythingGreedy}} macros do not stop at the end of the line and proceed to the next line of text."
  },
  "TOGGLECASEINSENSITIVEMODE": {

    "friendlyWriting": "ToggleCaseInsensitiveMode",
    "description": "Enables or disables case-insensitive mode."
  }
}
