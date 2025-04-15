import sys
import json

# Recommend Card Logic 
def recommend_cards(groceries, dining, gas, travel):
    creditCards = [
        {
            "name": "Chase Sapphire Preferred",
            "issuer": "Chase",
            "annualFee": 95,
            "base_rate": 1.0  # 1 point per $1 on non-bonus categories
        },
        {
            "name": "Chase Freedom Flex",
            "issuer": "Chase",
            "annualFee": 0,
            "base_rate": 1.0  # 1% back on all non-bonus spend
        },
        {
            "name": "American Express Gold",
            "issuer": "American Express",
            "annualFee": 250,
            "base_rate": 1.0  # 1x on most purchases outside its bonus categories
        },
        {
            "name": "Citi Double Cash",
            "issuer": "Citibank",
            "annualFee": 0,
            "base_rate": 2.0  # 2% total (1% on purchase, 1% on payment)
        },
        {
            "name": "Discover it Cash Back",
            "issuer": "Discover",
            "annualFee": 0,
            "base_rate": 1.0  # 1% base rate outside rotating 5% categories
        },
        {
            "name": "Capital One Venture Rewards",
            "issuer": "Capital One",
            "annualFee": 95,
            "base_rate": 2.0  # 2 miles per $1 on every purchase
        },
    ]

    totalSpend = groceries + dining + gas + travel
    for card in creditCards:
        monthRewards = (card["base_rate"] * totalSpend) - (card["annual_fee"] / 12)
        card["monthRewards"] = monthRewards
    
    sortedCards = sorted(creditCards, key=lambda c: c["monthRewards"], reverse=True)

    return sortedCards[:3]

def main():
    # Load the JSON from stdin or from sys.argv
    data = json.loads(sys.argv[1])

    print("DEBUG: Received data ->", data, file=sys.stderr) # goes to stderr

    # Convert strings to int
    groceries = int(data["groceries"])
    dining = int(data["dining"])
    gas = int(data["gas"])
    travel = int(data["travel"])

    # Recommendation
    recommend = recommend_cards(groceries, dining, gas, travel)

    print("DEBUG: Recommended ->", recommend, file=sys.stderr)

    print(json.dumps(recommend, indent=2))


if __name__ == "__main__":
    main()