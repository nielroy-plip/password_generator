#Gerador de senha com python

import random

lower_case = "abcdefghijklmnopqrstuvwxyz"
upper_case = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
numbers = "0123456789"
symbols = "@#$%¨&*()!"

for_pass = lower_case + upper_case + numbers + symbols

tamanho_da_senha = 12

password = "".join(random.sample(for_pass, tamanho_da_senha))

print("Minha senha: " + password)