# import re

# def modify_input_data(input_data):
#     modified_data = re.sub(r"`\w+Code`", "countryCode", input_data)
#     modified_data = re.sub(r"(?<=,)(\s*'\w+')\s*?(?=\))", "", modified_data)
#     return modified_data

# def modify_table_structure(table_structure):
#     modified_structure = re.sub(r"`\w+Code`", "countryCode", table_structure)
#     modified_structure = re.sub(r"countryCode VARCHAR\(200\)", "country TEXT NOT NULL REFERENCES country(two_letter)", modified_structure)
#     modified_structure = re.sub(r",\s*city BOOLEAN", "", modified_structure)
#     modified_structure = modified_structure.rstrip(",\n") + ");"
#     return modified_structure

# # Read the contents of the airports.txt file
# with open(r'C:\Users\Rizky Awanta Jordhie\OneDrive - UNIVERSITAS INDONESIA\TUGAS\UI\2-Pembelajaran\3-Kuliah\Materi x Buku\Semester 4\Sistem Basis Data\Praktikum\Proyek Akhir\Go.Fly\airports.txt', 'r') as file:
#     contents = file.read()

# # Extract table structure and input data
# table_structure = re.search(r"CREATE TABLE IF NOT EXISTS airports \((.*?)\);", contents, re.DOTALL).group(1)
# input_data = re.search(r"INSERT INTO `airports` \(.*?\) VALUES\s*(.*?);", contents, re.DOTALL).group(1)

# # Modify the table structure and input data
# modified_table_structure = modify_table_structure(table_structure)
# modified_input_data = modify_input_data(input_data)

# # Write the modified table structure to a new file
# with open("modified_table.sql", "w") as file:
#     file.write(modified_table_structure)

# # Write the modified input data to a new file
# with open("modified_data.sql", "w") as file:
#     file.write(modified_input_data)

# import re

# def modify_input_data(input_data):
#     modified_data = re.sub(r"`\w+Code`", "countryCode", input_data)
#     modified_data = re.sub(r"(?<=,)(\s*'\w+')\s*?(?=\))", "", modified_data)
#     modified_data = modified_data.rstrip(",\n")
#     return modified_data

# def modify_table_structure(table_structure):
#     modified_structure = re.sub(r"`\w+Code`", "countryCode", table_structure)
#     modified_structure = re.sub(r"countryCode VARCHAR\(200\)", "country TEXT NOT NULL REFERENCES country(two_letter)", modified_structure)
#     modified_structure = re.sub(r",\s*city BOOLEAN", "", modified_structure)
#     modified_structure = modified_structure.rstrip(",\n") + ");"
#     return modified_structure

# # Read the contents of the airports.txt file
# with open(r'C:\Users\Rizky Awanta Jordhie\OneDrive - UNIVERSITAS INDONESIA\TUGAS\UI\2-Pembelajaran\3-Kuliah\Materi x Buku\Semester 4\Sistem Basis Data\Praktikum\Proyek Akhir\Go.Fly\airports.txt', 'r') as file:
#     contents = file.read()

# # Extract table structure and input data
# table_structure = re.search(r"CREATE TABLE IF NOT EXISTS airports \((.*?)\);", contents, re.DOTALL).group(1)
# input_data = re.search(r"INSERT INTO `airports` \(.*?\) VALUES\s*(.*?);", contents, re.DOTALL).group(1)

# # Modify the table structure and input data
# modified_table_structure = modify_table_structure(table_structure)
# modified_input_data = modify_input_data(input_data)

# # Write the modified table structure and input data to a single SQL file
# with open("modified_data.sql", "w") as file:
#     file.write(modified_table_structure + "\n\n")
#     file.write("INSERT INTO `airports` (`code`, `name`, `cityCode`, `cityName`, `countryName`, `countryCode`, `timezone`, `lat`, `lon`, `numAirports`) VALUES\n")
#     file.write(modified_input_data + ";")
# import re

# def modify_input_data(input_data):
#     modified_data = re.sub(r"`\w+Code`", "countryCode", input_data)
#     modified_data = re.sub(r"(?<=,)(\s*'\w+')\s*?(?=(,|\)))", "", modified_data)
#     modified_data = modified_data.rstrip(",\n")
#     return modified_data

# def modify_table_structure(table_structure):
#     modified_structure = re.sub(r"`\w+Code`", "countryCode", table_structure)
#     modified_structure = re.sub(r"countryCode VARCHAR\(200\)", "country TEXT NOT NULL REFERENCES country(two_letter)", modified_structure)
#     modified_structure = re.sub(r",\s*city BOOLEAN", "", modified_structure)
#     modified_structure = modified_structure.rstrip(",\n") + ");"
#     return modified_structure

# # Read the contents of the airports.txt file
# with open(r'C:\Users\Rizky Awanta Jordhie\OneDrive - UNIVERSITAS INDONESIA\TUGAS\UI\2-Pembelajaran\3-Kuliah\Materi x Buku\Semester 4\Sistem Basis Data\Praktikum\Proyek Akhir\Go.Fly\airports.txt', 'r') as file:
#     contents = file.read()

# # Extract table structure and input data
# table_structure = re.search(r"CREATE TABLE IF NOT EXISTS airports \((.*?)\);", contents, re.DOTALL).group(1)
# input_data = re.search(r"INSERT INTO `airports` \(.*?\) VALUES\s*(.*?);", contents, re.DOTALL).group(1)

# # Modify the table structure and input data
# modified_table_structure = modify_table_structure(table_structure)
# modified_input_data = modify_input_data(input_data)

# # Write the modified table structure and input data to a single SQL file
# with open("modified_data.sql", "w") as file:
#     file.write(modified_table_structure + "\n\n")
#     file.write("INSERT INTO `airports` (`code`, `name`, `cityCode`, `cityName`, `countryName`, `countryCode`, `timezone`, `lat`, `lon`, `numAirports`) VALUES\n")
#     file.write(modified_input_data + ";")

import re

def modify_input_data(input_data):
    modified_data = re.sub(r"`\w+Code`", "countryCode", input_data)
    modified_data = re.sub(r"(?<=,)(\s*'\w+')\s*?(?=(,|\)))", "", modified_data)
    modified_data = modified_data.rstrip(",\n")
    modified_data = re.sub(r"(?<=\d),\s*\)", ")", modified_data)  # Remove comma before closing parenthesis
    return modified_data

def modify_table_structure(table_structure):
    modified_structure = re.sub(r"`\w+Code`", "countryCode", table_structure)
    modified_structure = re.sub(r"countryCode VARCHAR\(200\)", "country TEXT NOT NULL REFERENCES country(two_letter)", modified_structure)
    modified_structure = re.sub(r",\s*city BOOLEAN", "", modified_structure)
    modified_structure = modified_structure.rstrip(",\n") + ");"
    return modified_structure

# Read the contents of the airports.txt file
with open(r'C:\Users\Rizky Awanta Jordhie\OneDrive - UNIVERSITAS INDONESIA\TUGAS\UI\2-Pembelajaran\3-Kuliah\Materi x Buku\Semester 4\Sistem Basis Data\Praktikum\Proyek Akhir\Go.Fly\airports.txt', 'r') as file:
    contents = file.read()

# Extract table structure and input data
table_structure = re.search(r"CREATE TABLE IF NOT EXISTS airports \((.*?)\);", contents, re.DOTALL).group(1)
input_data = re.search(r"INSERT INTO `airports` \(.*?\) VALUES\s*(.*?);", contents, re.DOTALL).group(1)

# Modify the table structure and input data
modified_table_structure = modify_table_structure(table_structure)
modified_input_data = modify_input_data(input_data)

# Write the modified table structure and input data to a single SQL file
with open("modified_data.sql", "w") as file:
    file.write(modified_table_structure + "\n\n")
    file.write("INSERT INTO `airports` (`code`, `name`, `cityCode`, `cityName`, `countryName`, `countryCode`, `timezone`, `lat`, `lon`, `numAirports`) VALUES\n")
    file.write(modified_input_data + ";")
